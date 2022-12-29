jQuery.support.cors = true;
$(document).ajaxSend(function(){
    $('#loading_image').show();
});

$(window).bind("pageshow", function(event) {
    $('#loading_image').hide();
});

var baseConfig = {
    baseAngular_URL: "http://localhost:4200",
    baseAPI_URL: "https://devmbf.vietlottsms.vn/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var DevVINA_Config = {
    baseAngular_URL: "https://dev-angular-emb.vietlottsms.vn",
    baseAPI_URL: "https://devvnp.vietlottsms.vn/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var DevMOBI_Config = {
    baseAngular_URL: "https://dev-angular-emb.vietlottsms.vn",
    baseAPI_URL: "https://devmbf.vietlottsms.vn/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var DevVTEL_Config = {
    baseAngular_URL: "https://dev-angular-emb.vietlottsms.vn",
    baseAPI_URL: "https://devvtt.vietlottsms.vn/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var StagingVINA_Config = {
    baseAngular_URL: "https://st-web.vietlottsms.vn",
    baseAPI_URL: "https://st-api-vina.vietlottsms.vn:6443/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var StagingMOBI_Config = {
    baseAngular_URL: "https://st-web.vietlottsms.vn",
    baseAPI_URL: "https://st-api-mobi.vietlottsms.vn:6443/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

var StagingVTEL_Config = {
    baseAngular_URL: "https://st-web.vietlottsms.vn",
    baseAPI_URL: "https://st-api-vtel.vietlott-sms.vn:6443/mobile-api",
    ViettelPay_KEY: "CTIN@SECRETE@KEY@VIETTEL",
    VNPTPay_KEY: "CTIN@#123",
    MyMobifone_KEY: "CTIN@SECRETE@KEY@MOBIFONE",
}

function access(){
    let partner = $('#partner').val();
    let environment = $('#environment').val();

    if(partner == "-1"){
        $('#errorHandle').text("Chưa chọn partner");
        return;
    }

    let phone_regex = /((09|03|07|08)+([0-9]{8})\b)/g;
    if(phone_regex.test($('#phone_number').val()) == false){
        $('#errorHandle').text("Chưa nhập sđt hoặc sai định dạng");
        return;
    }

    if(environment != "-1"){
        switch(environment){    
            case "DEV_VINA":
                Object.assign(baseConfig, DevVINA_Config);
            break;
			
			case "DEV_MOBI":
                Object.assign(baseConfig, DevMOBI_Config);
            break;
			
			case "DEV_VTEL":
                Object.assign(baseConfig, DevVTEL_Config);
            break;
			
			case "STG_VINA":
                Object.assign(baseConfig, StagingVINA_Config);
            break;
			
			case "STG_MOBI":
                Object.assign(baseConfig, StagingMOBI_Config);
            break;
			
			case "STG_VTEL":
                Object.assign(baseConfig, StagingVTEL_Config);
            break;
        }
    }

    if($('#custom_API_URL').val() != ""){
       baseConfig.baseAPI_URL = $('#custom_API_URL').val().trim();
    }

    if($('#custom_domain_angular').val() != ""){
        baseConfig.baseAngular_URL = $('#custom_domain_angular').val().trim();
    }

    switch(partner){
        case "VIETTEL":
            goToPartnerVIETTEL();
        break;

        case "VNPTPAY":
            goToPartnerVNPTPay();
        break;

        case "MOBIFONE":
            goToPartnerMyMobifone();
        break;
    }
}

function goToPartnerVIETTEL(){
    let viettelPayLoaderRequest = {
        check_sum: "",
        merchant_code: "",
        msisdn: "",
        time: ""
    };
    
    viettelPayLoaderRequest.msisdn = $('#phone_number').val();
    viettelPayLoaderRequest.time = new Date().getTime();
    viettelPayLoaderRequest.merchant_code = $('#partner').val();
    viettelPayLoaderRequest.check_sum = sha256( baseConfig.ViettelPay_KEY + "" +
                                                viettelPayLoaderRequest.merchant_code + "" +
                                                viettelPayLoaderRequest.msisdn + "" +
                                                viettelPayLoaderRequest.time);
    
    console.log("viettelPayLoaderRequest: ", viettelPayLoaderRequest);

    window.location.href = baseConfig.baseAngular_URL + "/showview?" +
                                                "merchant_code=VIETTEL" +
                                                "&msisdn=" + viettelPayLoaderRequest.msisdn +
                                                "&time=" + viettelPayLoaderRequest.time +
                                                "&check_sum=" + viettelPayLoaderRequest.check_sum
}

function goToPartnerVNPTPay(){
    let VNPTPayLoaderRequest = {
        account: "",
        partner: "",
        time: "",
        secure_code: ""
    };
    
    VNPTPayLoaderRequest.account = $('#phone_number').val();
    VNPTPayLoaderRequest.time = new Date().getTime();
    VNPTPayLoaderRequest.partner = $('#partner').val();
    VNPTPayLoaderRequest.secure_code = sha256(  VNPTPayLoaderRequest.account + "|" +
                                                VNPTPayLoaderRequest.partner + "|" +
                                                VNPTPayLoaderRequest.time + "|" +
                                                baseConfig.VNPTPay_KEY);
    
    console.log("VNPTPayLoaderRequest: ", VNPTPayLoaderRequest);

    $.ajax({
        method: "POST",
        url: baseConfig.baseAPI_URL + "/embededapi/getview",
        data: JSON.stringify(VNPTPayLoaderRequest),
        success: function(res){
            console.log("vnpt-pay-loader-controller response: ", res);

            if(res.response_code == "00"){
                //description like: "https://www.viettlot-emb-test.com.vn?sessionKey=e077e478b7f34b6a9cf282d624e8e93f&partner=VNPT_PAY"
                window.location.href = baseConfig.baseAngular_URL + "/showview?" + res.description.split("?")[1];
            }else{
                $('#loading_image').hide();
                $('#errorHandle').text(JSON.stringify(res));
            }
        },
        error: function(jqXHR){
            $('#loading_image').hide();
            console.log("vnpt-pay-loader-controller error: ", jqXHR);
        },
        contentType: "application/json",
        dataType: 'json'
    });
}

function goToPartnerMyMobifone(){
    let mobifoneLoaderRequest = {
        token: "",
        msisdn: "",
        time: "",
        checksum: ""
      };
    
    mobifoneLoaderRequest.msisdn = $('#phone_number').val();
    mobifoneLoaderRequest.time = new Date().getTime();
    mobifoneLoaderRequest.token = $('#myMBF_token').val();
    mobifoneLoaderRequest.checksum = sha256( mobifoneLoaderRequest.msisdn + "|" +
                                                mobifoneLoaderRequest.token + "|" +
                                                mobifoneLoaderRequest.time + "|" +
                                                baseConfig.MyMobifone_KEY);
    
    console.log("mobifoneLoaderRequest: ", mobifoneLoaderRequest);

    $.ajax({
        method: "POST",
        url: baseConfig.baseAPI_URL + "/embededapi/embedded/getview",
        data: JSON.stringify(mobifoneLoaderRequest),
        success: function(res){
            console.log("mobifone-loader-controller response: ", res);

            if(res.response_code == "VLT-00"){
                sessionStorage.setItem($('#phone_number').val(), mobifoneLoaderRequest.token);

                //description like: "https://www.viettlot-emb-test.com.vn?sessionKey=e077e478b7f34b6a9cf282d624e8e93f&partner=VNPT_PAY"
                window.location.href = baseConfig.baseAngular_URL + "/showview?" + res.description.split("?")[1];
            }else{
                $('#loading_image').hide();
                $('#errorHandle').text(JSON.stringify(res));
            }
        },
        error: function(jqXHR){
            $('#loading_image').hide();
            console.log("mobifone-loader-controller error: ", jqXHR);
        },
        contentType: "application/json",
        dataType: 'json'
    });
}

function autoFillMBF_Token(){
    if($('#phone_number').val() != "" && $('#partner').val() == "MOBIFONE"){
        $('#myMBF_token').val(sessionStorage.getItem($('#phone_number').val()));
        $('#myMBF_token').show();
    }else{
        $('#myMBF_token').val("");
        $('#myMBF_token').hide();
    }
}