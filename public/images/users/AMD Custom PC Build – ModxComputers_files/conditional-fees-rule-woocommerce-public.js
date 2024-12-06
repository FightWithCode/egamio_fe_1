(function($){'use strict';function paymentMethod(){this.init=function(){this.detectPaymentChange();this.dateChange();this.optionalFees();this.previousDate='';this.removingExtraAddedFormField();this.dateChangeCount=0}
this.optionalFees=function(){var parent=this;jQuery(document).on('change','.pi-cefw-optional-fees',function(){jQuery('body').trigger('update_checkout',{update_shipping_method:!0});parent.update_cart()})}
this.update_cart=function(){var element=jQuery('button[name="update_cart"]');if(element.length>0){element.prop('disabled',!1);element.trigger('click');element.prop('disabled',!0)}}
this.dateChange=function(){var parent=this;jQuery(document).on('change','#pi_delivery_date',function(){var date=jQuery(this).val();var upd=parent.previousDate;if(upd!=date&&parent.dateChangeCount>1){parent.shippingChangeByDateChange()}
if(parent.dateChangeCount<=1){jQuery('body').trigger('update_checkout',{update_shipping_method:!0})}
parent.previousDate=date;parent.dateChangeCount=parent.dateChangeCount+1})}
this.detectPaymentChange=function(){var parent=this;jQuery('body').on('change','input[name="payment_method"]',function(){parent.cartReload()})}
this.cartReload=function(){jQuery("body").trigger('update_checkout')}
this.shippingChangeByDateChange=function(){var parent=this;var count=jQuery('input[name="trigger_by_pickup_location_change"]').length;if(count==0){jQuery('form.woocommerce-checkout').append('<input type="hidden" name="trigger_by_pickup_location_change" value="1">')}
var new_count=jQuery('input[name="trigger_by_pickup_location_change"]').length;if(new_count>0){jQuery('body').trigger('update_checkout',{update_shipping_method:!0})}}
this.removingExtraAddedFormField=function(){jQuery(document).on('updated_checkout',function(e,response){jQuery('form.woocommerce-checkout input[name="trigger_by_pickup_location_change"]').remove()})}}
function pickupLocationChange(){jQuery(document).on("change","input[name=\'pickup_location\'], select[name=\'pickup_location\']",function(){jQuery("body").trigger("update_checkout",{update_shipping_method:!0})})}
jQuery(function(){var paymentMethod_Obj=new paymentMethod();paymentMethod_Obj.init();pickupLocationChange()})})(jQuery)