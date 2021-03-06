const {Form, Input, Button, Modal, Message} = Antd

class $NoteHeader extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      windowWidth: 0,
      edit: false,
      memberVisible: false,
    }
  }
  goToBack(e) {
    e.preventDefault()
    const {location} = this.props
    if (location.state && location.state.backPathname) {
      this.context.router.replace(location.state.backPathname)
    } else {
      this.context.router.replace('/dashboard')
    }
  }
  handleEdit(e) {
    e.preventDefault()
    this.setState({edit: true})
    setTimeout(() => {
      $(this.refs.noteTitle).find('.edit input').select()
    }, 10)
  }
  handleSubmit(e) {
    e.preventDefault()
    const {name} = this.props.form.getFieldsValue()
    if (!name || name == '') {
      return Message.error('标题不能为空！')
    }

    if (name == this.props.note.name) {
      return this.setState({edit: false})
    }

    Meteor.call('updateNote', this.props.note._id, {$set: {name}}, (error) => {
      if (!error) {
        if (this.status != 'unmount') {
          this.setState({edit: false})
        }
      } else {
        Message.error('更改标题失败，请等待一会再试！')
      }
    })
  }
  handleMemberOpen(e) {
    e.preventDefault()
    this.setState({windowWidth: $(window).width(), memberVisible: true})
  }
  handleMemberClose() {
    this.setState({memberVisible: false})
  }
  componentWillUnmount() {
    this.status = 'unmount'
  }
  render() {
    const {edit} = this.state
    const {note, folder} = this.props
    const {getFieldProps} = this.props.form
    return (
      <div className="note-header">
        <div className="inner">
          <a className="back" onClick={this.goToBack.bind(this)}><i className="material-icons">keyboard_backspace</i></a>
          <div className="users">
            <Button type="primary" onClick={this.handleMemberOpen.bind(this)}>分享</Button>
          </div>
          <div className="title" ref="noteTitle">
            {!edit ? (
              <div className="view" onClick={this.handleEdit.bind(this)}>
                <h1>{note.name}</h1>
                <a><i className="material-icons">edit</i> 编辑</a>
              </div>
            ) : (
              <div className="edit">
                <Form onSubmit={this.handleSubmit.bind(this)} autoComplete="off">
                  <Form.Item>
                    <Input placeholder="请输入标题" onBlur={this.handleSubmit.bind(this)}
                      {...getFieldProps('name', {initialValue: note.name})}
                    />
                  </Form.Item>
                </Form>
              </div>
            )}
          </div>
          <Modal title="" footer="" width="620" className="modaol-member-note" transitionName={this.state.windowWidth < 670 ? 'fade' : 'zoom'} visible={this.state.memberVisible} onCancel={this.handleMemberClose.bind(this)}>
            <MemberNote note={note} folder={folder} visible={this.state.memberVisible}  close={this.handleMemberClose.bind(this)}/>
          </Modal>
        </div>
      </div>
    )
  }
}

$NoteHeader.contextTypes = {
  router: React.PropTypes.object.isRequired
}

NoteHeader = Form.create()($NoteHeader)
