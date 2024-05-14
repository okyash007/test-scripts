var tbShop = typeof Shopify !== 'undefined' ? Shopify.shop : document.domain;

var tbShopDomain = document.domain;

var tbBasePath = 'https://' + tbShopDomain + '/apps/proxy/';
var tbHead = document.getElementsByTagName('head')[0];
var tbUserInfo = localStorage.getItem('tailboostUser');
var tbUserAgent = window.navigator.userAgent;
var tbJson = "";

//LOAD Setting JSON
// var tbJsonTag = document.querySelector("[tail-boost-json]");
// if (typeof (tbJsonTag) != 'undefined' && tbJsonTag != null) {
//   tbJson = JSON.parse(tbJsonTag.innerHTML);
// }



if (typeof jQuery == 'undefined') {

  var tbScript = document.createElement('script');

  tbScript.src = tbBasePath + 'js/lib/jquery-3.4.1.min.js';

  tbScript.type = 'text/javascript';

  tbScript.onreadystatechange = tailboostHandler;

  tbScript.onload = tailboostHandler;

  // Fire the loading

  tbHead.appendChild(tbScript);

} else {

  tailboostHandler();

}

function tailboostHandler() {

  $tbjobject = window.jQuery;

  tbStyle = "<link rel='stylesheet' href='"+tbBasePath+"css/frontend/frontend.css' type='text/css'/>";

  $tbjobject("head").append($tbjobject(tbStyle));

  //var tbOrderID = $tbjobject('.tailboost-thankyou-wrapper').attr('tb-order-id');
  var tbOrderID = typeof Shopify.checkout !== 'undefined' ? Shopify.checkout.order_id : 0;
  console.log(tbOrderID);
 
  
    //for set tailboost status on load
    if(tbUserInfo == '' || tbUserInfo == null){
        tailboostSetUserStatus($tbjobject);
        tbUserInfo = localStorage.getItem('tailboostUser');
    }
    //Get the settings
    $tbjobject.ajax({
        type: 'GET',
        url: tbBasePath+"getUserData",
        data: {"shop": tbShop },
        success: function(data) {  
            if(data != "" || data == null){
                tbJson = JSON.parse(data);
                //For sent user data 
                tailboostUserData($tbjobject,tbOrderID,tbUserAgent,tbUserInfo);
            }
        }
      });
}

function tailboostSetUserStatus($tbjobject) {
  $.ajax({
    url: 'https://ipinfo.io/json',
    method: 'GET',
    success: function(data) {
      // Access the IP address from the response data
      const ipAddress = data.ip;
      localStorage.setItem('tailboostUser', ipAddress);
      
    },
    error: function(error) {
      console.error('Error fetching IP address:', error);
    }
  });
  return true;
}

function tailboostUserData($tbjobject,tbOrderID,tbUserAgent,tbUserInfo) {
  
  $tbjobject.ajax({
    type: 'GET',
    url: tbBasePath+"thank_you",
    data: {"shop": tbShop, "userAgent": tbUserAgent,"orderId": tbOrderID, "userIP": tbUserInfo },
    success: function(data) {
      
      if(data != "" || data == null){
        tbUserResponse = data.split(':');
        var tbuserID =tbUserResponse[1].replace('"', '');

        if(tbJson != ""){
          var tbSettings = tbJson.settings;
          console.log(tbOrderID);
          if(tbSettings.app_status == 1){
            if(tbOrderID != 0){
                //For get add and set it in the wrapper div
                tailboostGetAdd($tbjobject,tbuserID,tbSettings);
            }else{
                console.log("Tailboost User is logged in with ID" + tbuserID);
            }
            
          }else{
            console.log("Tailboost App is disabled");
          }

        }else{
          console.log("Tailboost setting not available");
        }        
        
      }
      
    }
  });

}

function tailboostGetAdd($tbjobject,tbuserID,tbSettings) {
  $tbjobject.ajax({
    type: 'GET',
    url: tbBasePath+"load_add",
    data: {"shop": tbShop,"tbUserId":tbuserID},
    success: function(addResponse) {
      if(addResponse != "" || addResponse == null){
        var addResponseHTML = JSON.parse(addResponse);
        
        if(tbSettings.placement_type == 0){
          if(tbSettings.position == 1){
            
            $tbjobject('.step__sections').prepend('<div class="tb-inline-wrapper"></div>');
          }else{
            $tbjobject('.step__sections').append('<div class="tb-inline-wrapper"></div>');
          }
          
          $tbjobject('.tb-inline-wrapper').html(addResponseHTML.ad_response);
        }else{
          var tbModalHtml = '<div class="tailboost-modal-wrapper" id="tailboost-modal-wrapper">'+
          '<div class="tb_modal-content">'+
            '<span class="tb_close">&times;</span>'+
            addResponseHTML.ad_response+
          '</div>'+          
          '</div>';
          $tbjobject('.step__sections').prepend('<div class="tb-model-wrapper"></div>');
          $tbjobject('.tb-model-wrapper').html(tbModalHtml);
          tailboostModal($tbjobject);
        }
        
      }
      
    }
  });
}


function tailboostModal($tbjobject) {

      // Get the modal
      var tbModal = document.getElementById('tailboost-modal-wrapper');
      
      // Get the <span> element that closes the modal
      var tbSpan = document.getElementsByClassName("tb_close")[0];

      tbModal.style.display = "block";

      tbSpan.onclick = function() {
        tbModal.style.display = "none";
      }
    
}