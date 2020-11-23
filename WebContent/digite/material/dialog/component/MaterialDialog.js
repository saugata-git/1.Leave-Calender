/**
 * NOTE: This file is AMD supported
 * 
 * This file will only contain methods written in plain javascript
 * 
 *
 **/

(function (root, factory) {
	if (typeof define != 'undefined' && define.amd) {
		define([
			'jquery',
			'underscore',
			'MaterialButton'
		], factory);
	} else {
		root.MaterialDialog = factory(root.$, root._, root.MaterialButton);
	}
} (this, function ($, _, MaterialButton) {
	var MaterialDialog = function (a_props) {
		this.props = {
			type: 'confirm',
			id: undefined,
			header: undefined,
			body: undefined,
			attributes: {}
		};
		
		if ( a_props ) {
			for ( var key in a_props ) {
				this.props[key] = a_props[key];
			}
		}
		
		this.createBaseTag();
		
		this.template = this.getTemplate(a_props);
	};
	
	MaterialDialog.prototype.render = function () {
		this.$el.append(this.template(this.props));
		
		this.$el.find('.MuiDialogContent-root').append(this.props.body);
		
		var w_footer = this.$el.find('.MuiDialogActions-root');
		
		
		this.onButtonClick = this.onButtonClick.bind(this);
		this.closeBox = this.closeBox.bind(this);
		
		var w_cancelButton = new MaterialButton({
			id: 'Mui-dialog-cancel',
			text: 'CANCEL',
			onClick: this.onButtonClick
		});
		w_cancelButton.render();
		
		w_footer.append(w_cancelButton.el);
		
		var w_saveButton = new MaterialButton({
			id: 'Mui-dialog-confirm',
			text: 'CONFIRM',
			variant: 'contained',
			onClick: this.onButtonClick
		});
		w_saveButton.render();
		
		w_footer.append(w_saveButton.el);
		
		this.saveButton = w_saveButton;
		this.cancelButton = w_cancelButton;
		
		this.$el.find('.MuiDialog-container')[0].addEventListener('click', this.closeBox);
	};
	
	MaterialDialog.prototype.closeBox = function (a_event) {
		if ( a_event.target && $(a_event.target).hasClass('MuiDialog-container') ) {
			//this.destroy();
		}
	};

	MaterialDialog.prototype.createBaseTag = function () {
		var w_el = document.createElement('div');
		
		w_el.className = "MuiDialog-root";
		
		this.el = w_el;
		this.$el = $(w_el);
	};
	
	MaterialDialog.prototype.getTemplate = function () {
		var w_template = _.template('<div class="MuiDialog-container MuiDialog-scrollPaper">' +
			'<div class="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiPaper-elevation24 MuiPaper-rounded">' +
			'<div class="MuiDialogTitle-root"><h2 class="MuiTypography-root MuiTypography-h6"><span class="icon-Material-Warning Mui-header-icon">' +
			'</span><%=header%></h2></div><div class="MuiDialogContent-root"></div><div class="MuiDialogActions-root MuiDialogActions-spacing">' + 
			'</div></div></div>');
		
		return w_template;
	};
	
	MaterialDialog.prototype.onButtonClick = function (a_event, a_props) {
		this.destroy();
		
		if ( this.props.callbackFn ) {
			this.props.callbackFn(a_props.id === 'Mui-dialog-confirm');
		}
	};
	
	MaterialDialog.prototype.destroy = function () {
		this.$el.find('.MuiDialog-container')[0].removeEventListener('click', this.closeBox);
		
		this.saveButton.destroy();
		this.cancelButton.destroy();
		
		this.$el.remove();
	};
	
	return MaterialDialog;
}));