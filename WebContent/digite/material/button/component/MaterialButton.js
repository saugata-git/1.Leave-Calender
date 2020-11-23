/**
 * NOTE: This file is AMD supported
 * 
 * This file will only contain methods written in plain javascript
 * Ripple animation on button click will require work
 *
 **/

(function (root, factory) {
	if (typeof define != 'undefined' && define.amd) {
		define([
			'jquery',
			'underscore'
		], factory);
	} else {
		root.MaterialButton = factory(root.$, root._);
	}
} (this, function ($, _) {
	var MaterialButton = function (a_props) {
		this.props = {
			color: 'primary',
			//variant: 'contained',
			variant: 'blank',
			disabled: false,
			text: undefined,
			attributes: {}
		};
		
		if ( a_props ) {
			for ( var key in a_props ) {
				this.props[key] = a_props[key];
			}
		}
		
		this.constants = {
			muidisabled: "Mui-disabled"
		}
		
		this.createBaseTag();
		
		this.template = this.getButtonTemplate(a_props);
	};
	
	MaterialButton.prototype.render = function () {
		this.$el.append(this.template(this.props));
	};

	MaterialButton.prototype.createBaseTag = function () {
		var w_buttonEl = document.createElement('button');
		
		w_buttonEl.className = "MuiButtonBase-root MuiButton-root MuiButton-" + this.props.variant + 
			" MuiButton-" + this.props.variant + this.props.color + ( this.props.disabled ? " " + this.constants.muidisabled : "");
		
		w_buttonEl.setAttribute('type', 'button');
		
		for (var attrKey in this.props.attributes) {
			w_buttonEl.setAttribute(attrKey, this.props.attributes[attrKey]);
		}
		
		this.el = w_buttonEl;
		this.$el = $(w_buttonEl);
		
		this.onButtonClick = this.onButtonClick.bind(this);
		
		w_buttonEl.addEventListener('click', this.onButtonClick);
	};
	
	MaterialButton.prototype.getButtonTemplate = function () {
		var w_template = _.template('<div class="MuiButtonOverlay"></div><span class="MuiButton-label"><%=text%></span><span class="MuiTouchRipple-root"></span>');
		
		return w_template;
	};
	
	MaterialButton.prototype.onButtonClick = function (a_event) {
		if ( this.props.onClick ) {
			this.props.onClick(a_event, this);
		}
		
		this.showRippleEffect(a_event);
	};
	
	MaterialButton.prototype.showRippleEffect = function (a_event) {
		var that = this;
		
		this.clearRipple();
		
		this.rippleTimeoutId = setTimeout(function () {
			that.clearRipple();
		}, 550);
		
		var w_rippleCnt = document.createElement('span');
		var w_rippleStyle = this.getRippleStyle(a_event);
		
		for ( var styleKey in w_rippleStyle ) {
			w_rippleCnt.style[styleKey] = w_rippleStyle[styleKey];
		}
		
		w_rippleCnt.className = "MuiTouchRipple-ripple MuiTouchRipple-rippleVisible";
		
		var w_rippleTemlate = _.template('<span class="MuiTouchRipple-child MuiTouchRipple-childLeaving"></span>');
		
		$(w_rippleCnt).append(w_rippleTemlate());
		
		this.$el.find('.MuiTouchRipple-root').append(w_rippleCnt);
	};
	
	MaterialButton.prototype.getRippleStyle = function (a_event) {
		var w_element = a_event.currentTarget;
		var w_rect = w_element.getBoundingClientRect();
		var w_rippleX;
	    var w_rippleY;
		var w_rippleSize;
			
		if (a_event.clientX === 0 && a_event.clientY === 0 || !a_event.clientX && !a_event.touches) {
			w_rippleX = Math.round(w_rect.width / 2);
			w_rippleY = Math.round(w_rect.height / 2);
	    } else {
	      var w_ref = a_event.touches ? a_event.touches[0] : a_event;
	      var w_clientX = w_ref.clientX, w_clientY = w_ref.clientY;
	      
	      w_rippleX = Math.round(w_clientX - w_rect.left);
	      w_rippleY = Math.round(w_clientY - w_rect.top);
	    }
			
		if (/*center*/ false) {
	      /*rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);
	      if (rippleSize % 2 === 0) {
	        rippleSize += 1;
	      }*/
	    } else {
	      var w_sizeX = Math.max(Math.abs((w_element ? w_element.clientWidth : 0) - w_rippleX), w_rippleX) * 2 + 2;
	      var w_sizeY = Math.max(Math.abs((w_element ? w_element.clientHeight : 0) - w_rippleY), w_rippleY) * 2 + 2;
	      
	      w_rippleSize = Math.sqrt(Math.pow(w_sizeX, 2) + Math.pow(w_sizeY, 2));
	    }
			  
		var w_rippleStyles = {
		    width: w_rippleSize + 'px',
		    height: w_rippleSize + 'px',
		    top: -(w_rippleSize / 2) + w_rippleY + 'px',
		    left: -(w_rippleSize / 2) + w_rippleX + 'px'
		};
		
		return w_rippleStyles;
	};
	
	MaterialButton.prototype.clearRipple = function (a_event) {
		clearTimeout(this.rippleTimeoutId);
		
		this.$el.find('.MuiTouchRipple-ripple').remove();
	};
	
	MaterialButton.prototype.enableButton = function () {
		this.props.disabled = false;
		this.$el.removeClass(this.constants.muidisabled);
	};
	
	MaterialButton.prototype.disableButton = function () {
		this.props.disabled = true;
		this.$el.addClass(this.constants.muidisabled);
	};
	
	MaterialButton.prototype.destroy = function () {
		this.el.removeEventListener('click', this.onButtonClick);
		
		this.$el.remove();
	};
	
	return MaterialButton;
}));