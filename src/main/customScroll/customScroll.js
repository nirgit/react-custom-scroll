define(['react', 'lodash', './customScroll.rt'], function (React, _, template) {
    'use strict';

    return React.createClass({
        displayName: 'customScroll',
        getInitialState: function () {
            this.scrollbarWidth = 0;
            return {
                scrollPos: 0
            };
        },
        componentDidMount: function () {
            this.forceUpdate();
        },
        componentWillUpdate: function () {
            if (!this.isMounted()) {
                this.scrollbarWidth = 0;
            }
            var contentWrapper = this.refs.innerContainer.getDOMNode();
            this.scrollbarWidth = contentWrapper.offsetWidth - contentWrapper.clientWidth;
            this.contentHeight = contentWrapper.scrollHeight;
            this.wrapperHeight = contentWrapper.clientHeight;
            this.scrollHandleHeight = contentWrapper.clientHeight * contentWrapper.clientHeight / contentWrapper.scrollHeight;
        },
        getScrollHandleStyle: function () {
            var handlePosition = this.state.scrollPos + this.state.scrollPos * this.wrapperHeight / this.contentHeight;
            return {
                height: this.scrollHandleHeight,
                top: handlePosition
            };
        },
        onScroll: function (e) {
            this.setState({
                scrollPos: e.currentTarget.scrollTop
            });
        },
        blockOuterScroll: function(e){
            var contentNode = e.currentTarget;
            var totalHeight = this.contentHeight;
            var maxScroll = totalHeight - e.currentTarget.clientHeight;
            var delta = e.deltaY % 3 ? (e.deltaY) : (e.deltaY * 10);
            if (contentNode.scrollTop + delta <= 0) {
                contentNode.scrollTop = 0;
                e.preventDefault();
            } else if (contentNode.scrollTop + delta >= maxScroll){
                contentNode.scrollTop = maxScroll;
                e.preventDefault();
            }
        },
        render: template
    });
});
