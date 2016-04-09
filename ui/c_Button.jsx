/**
 * Created by sqsun on 2015/9/22.
 */
define(['react', 'react.backbone'], function(React) {
    var ButtonComponent = React.createBackboneClass({
        render: function() {
            return (
                <div onClick={this.handleClick.bind(this)}
                className={this.props.className}>
                {this.props.children }
                </div>
            )
        },
        handleClick() {
            if (this.props.onClick) {
                this.props.onClick()
            }
        }
    });

    return ButtonComponent;
})