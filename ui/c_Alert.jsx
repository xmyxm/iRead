/**
 * Created by sqsun on 2015/9/22.
 */
define(['react', 'react.backbone', 'jsx!cButton', 'jsx!cOverlay'], function(React, rbackbone, Button, Overlay) {
    var AlertComponent = React.createBackboneClass({
        render: function() {
            var buttons = null;
            buttons = this.props.buttons && this.props.buttons.map(function(btn) {
                return <Button onClick={btn.click} className="cui-flexbd">{btn.text}</Button>
            });
            return (
                <Overlay className="cui-view cui-mask cui-opacitymask" onClick={this.props.onClick}>
                <div className="cui-pop-box">
                    <div className="cui-bd">
                        <div className="cui-error-tips">
                        {this.props.message}
                        </div>
                        {
                        buttons &&
                        <div className="cui-roller-btns">
                            {buttons}
                        </div>
                        }
                    </div>
                </div>
                </Overlay>
            )
        }
    });
    return AlertComponent;
})