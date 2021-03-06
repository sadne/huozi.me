if (typeof Antd === 'undefined') {
  Antd = {}
}

const {Radio} = Rc
const AntRadio = React.createClass({
  getDefaultProps() {
    return {
      prefixCls: 'ant-radio'
    };
  },
  render() {
    const { prefixCls, children, checked, disabled, className } = this.props;
    const classString = classNames({
      [prefixCls]: true,
      [prefixCls + '-checked']: checked,
      [prefixCls + '-disabled']: disabled,
      [className]: !!className,
    });
    return (
      <label className={classString}>
        <Radio {...this.props} children={null} />
        {children}
      </label>
    );
  }
});

Antd.Radio = AntRadio;
