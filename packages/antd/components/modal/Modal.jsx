if (typeof Antd === 'undefined') {
  Antd = {}
}

const Dialog = Rc.Dialog
const {Dom} = Rc.Util
const {Button} = Antd

function noop() {}

let mousePosition;
let mousePositionEventBinded;

Antd.Modal = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-modal',
      onOk: noop,
      onCancel: noop,
      okText: '确定',
      cancelText: '取消',
      width: 520,
      transitionName: 'zoom',
      maskAnimation: 'fade',
      confirmLoading: false,
      visible: false,
    };
  },

  handleCancel(e) {
    this.props.onCancel(e);
  },

  handleOk() {
    this.props.onOk();
  },

  componentDidMount() {
    if (mousePositionEventBinded) {
      return;
    }
    // 只有点击事件支持从鼠标位置动画展开
    Dom.addEventListener(document.documentElement, 'click', (e) => {
      mousePosition = {
        x: e.pageX,
        y: e.pageY
      };
      // 20ms 内发生过点击事件，则从点击位置动画展示
      // 否则直接 zoom 展示
      // 这样可以兼容非点击方式展开
      setTimeout(() => mousePosition = null, 20);
    });
    mousePositionEventBinded = true;
  },

  render() {
    let props = this.props;
    let defaultFooter = [
      <Button key="cancel"
        type="ghost"
        size="large"
        onClick={this.handleCancel}>
        {props.cancelText}
      </Button>,
      <Button key="confirm"
        type="primary"
        size="large"
        loading={props.confirmLoading}
        onClick={this.handleOk}>
        {props.okText}
      </Button>
    ];
    let footer = props.footer || defaultFooter;
    return (
      <Dialog onClose={this.handleCancel} footer={footer} {...props}
        visible={props.visible} mousePosition={mousePosition} />
    );
  }
});
