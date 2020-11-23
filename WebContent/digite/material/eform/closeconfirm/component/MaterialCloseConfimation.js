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
			'MaterialTextField',
			'MaterialSnackbar',
			'MaterialDialog'
		], factory);
	} else {
		root.MaterialCloseConfimation = factory(root.$, root._, root.MaterialTextField, root.MaterialSnackbar, root.MaterialDialog);
	}
} (this, function ($, _, MaterialTextField, MaterialSnackbar, MaterialDialog) {
	var MaterialCloseConfimation = function (a_props) {
		this.props = a_props;
	};
	
	MaterialCloseConfimation.prototype.render = function () {
		this.onConfirmationTextChange = this.onConfirmationTextChange.bind(this);
		
		var w_dialogBody = document.createElement('div');
		w_dialogBody.className = 'Mui-close-dialog-body';
		
		var w_bodyTemplate = this.getPopUpBody();
		
		$(w_dialogBody).append(w_bodyTemplate());
		
		var w_confirmationTextfield = new MaterialTextField({
			label: "Type <b>Close</b> to confirm",
			required: true
		});
		
		w_confirmationTextfield.render();
		
		$(w_dialogBody).append(w_confirmationTextfield.el);
		
		
		var w_dialog = new MaterialDialog({
			header: "This operation cannot be reversed. Are you sure?",
			body: w_dialogBody
		});
					
		w_dialog.render();
		
		w_dialog.saveButton.disableButton();
		w_dialog.saveButton.props.onClick = this.confirmClose.bind(this);
		w_dialog.cancelButton.props.onClick = this.enableSubmitButtons.bind(this);

		document.body.appendChild(w_dialog.el);
		
		this.dialog = w_dialog;
		this.confirmationTextfield = w_confirmationTextfield;
		
		
		w_confirmationTextfield.$el.find('input')[0].addEventListener('keyup', this.onConfirmationTextChange);
	};
	
	MaterialCloseConfimation.prototype.enableSubmitButtons = function () {
		this.destroy();
		this.props.parent.enableSubmitButtonsWrapper();
	};
	
	MaterialCloseConfimation.prototype.getPopUpBody = function () {
		var w_template = _.template('<div class="Mui-close-heading">Closing this card will:</div><div class="Mui-close-info">' +
		'<div>1. Close all ToDos of this card</div><div>2. Close all child cards and their ToDos</div>' +
		'<div>3. Publish all logged effort on the ToDos as Actual Effort</div>' +
		'<div>4. Set Percent Complete attributes of all cards in this hierarchy including this card to 100%.</div></div>' +
		'<div class="Mui-close-note"><b>NOTE:</b> Closure of the card may take time. You will receive an email once the card is closed.</div>');
		
		return w_template;
	};
	
	MaterialCloseConfimation.prototype.onConfirmationTextChange = function (a_event) {
		var w_text = a_event.currentTarget.value.trim();
		
		if ( w_text.toLocaleLowerCase() === 'close' ) {
			this.dialog.saveButton.enableButton();
		} else {
			this.dialog.saveButton.disableButton();
		}
	};
	
	MaterialCloseConfimation.prototype.confirmClose = function (a_event) {
		var me = this;
		var w_actionToPerform = this.props.actionToPerform;
		var w_params = {};
		w_params['HierarchyCloseCardId'] = this.props.uniqueId;
		
		DE.ajaxRequest({
			url: this.props.closeUrl,
			params: w_params,
			responseType: 'void',
			success: function(a_response) {
				var w_snackbar = new MaterialSnackbar({
					text: 'Card has been closed',
					undoCallback: me.undoCloseOperation.bind(me)
				});

				w_snackbar.render();
				
				document.body.appendChild(w_snackbar.el);
				
				me.props.parent.document.ServerValidationForm.EFormActionToPerform.value = w_actionToPerform;
				if (me.props.isTreeEform){
					me.props.parent.parent.document.getElementById("doNotReloadWindow").value = "Y";
				}
				else
					document.getElementById("doNotReloadWindow").value = "Y";
				var w_serverSideDivObj = me.props.parent.parent.document.getElementById("ServerSideDiv");
				w_serverSideDivObj.style.display='';
				me.props.parent.document.ServerValidationForm.submit();
				
				me.snackbar = w_snackbar;
				me.destroy(true);
				//me.props.parent.enableSubmitButtonsWrapper();
			}
		});
	};
	
	MaterialCloseConfimation.prototype.undoCloseOperation = function (a_event) {
		var w_params = {};
		var me = this;
		w_params['HierarchyCloseCardId'] = this.props.uniqueId;		
		DE.ajaxRequest({
			url: this.props.undoUrl,
			params: w_params,
			responseType: 'void',
			success: function(a_response) {
				if (me.props.isTreeEform){
					me.props.parent.parent.document.getElementById("doNotReloadWindow").value = "N";
				}
				else
					document.getElementById("doNotReloadWindow").value = "N";
				
				var w_contentFrame = top.document.getElementById('contentframe');
				if (w_contentFrame) {
					var w_contentWindow = top.document.getElementById('contentframe').contentWindow;
			
					if(!w_contentWindow.w_previouslyEnabledButtons) {
						w_contentWindow = getFrameInTreeView(w_contentWindow, 1);
					}
				} else {
					w_contentWindow = top;
				}
				
				var w_popupFrame = top.document.getElementById('PopupFrame');
				if (w_popupFrame && w_popupFrame.contentWindow && w_popupFrame.contentWindow.enableSubmitButtons) {
					w_popupFrame.contentWindow.enableSubmitButtons();
				}
				else if (w_contentWindow && w_contentWindow.enableSubmitButtons) {
				w_contentWindow.enableSubmitButtons();
			}
				else {
					me.props.parent.enableSubmitButtons();
				}
			}
		});
	};
	
	MaterialCloseConfimation.prototype.destroy = function (a_fromConfirm) {
		if ( this.confirmationTextfield ) {
			this.confirmationTextfield.$el.find('input')[0].removeEventListener('click', this.onConfirmationTextChange);
			this.confirmationTextfield = undefined;
		}
		
		if ( !a_fromConfirm && this.snackbar ) {
			this.snackbar.destroy();
		}
		
		if ( this.dialog ) {
			this.dialog.destroy();
			this.dialog = undefined;
		}
	};
	
	return MaterialCloseConfimation;
}));