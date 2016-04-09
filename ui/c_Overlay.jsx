/**
 * Created by sqsun on 2015/9/22.
 */
define(['react', 'react.backbone'], function(React) {
    var OverlayComponent = React.createBackboneClass({
        render: function() {
            return (
                <div className={this.props.className} onClick={this.props.onClick}>{this.props.children}</div>
            )
        }
    });
    return OverlayComponent;
})