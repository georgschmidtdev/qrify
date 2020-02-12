document.addEventListener("DOMContentLoaded", assignVariables, false);

function assignVariables(){

    let submitForm = document.getElementById('submitForm');

    submitForm.addEventListener('submit', handleSubmit);
}

function handleSubmit(event){

    event.preventDefault();

    let submitInput = document.getElementById('submitInput').value;

    let submitQuery = submitInput.trim();

    createParameters(submitQuery);
}

function createParameters(UrlToEncode){

    let url = encodeURI(UrlToEncode);

    let selectFormat = document.getElementById('selectFormat');

    let selectSize = document.getElementById('selectSize');

    let selectColor = document.getElementById('selectColor');
    let customColR = document.getElementById('customColR');
    let customColG = document.getElementById('customColG');
    let customColB = document.getElementById('customColB');

    let selectBgColor = document.getElementById('selectBgColor');
    let customBgColR = document.getElementById('customBgColR');
    let customBgColG = document.getElementById('customBgColG');
    let customBgColB = document.getElementById('customBgColB');

    let format = selectFormat.value;
    
    let size = selectSize.value;

    let color;

    let bgColor;

    if(selectColor.value == 'custom'){

        color = `${customColR.value}-${customColG.value}-${customColB.value}`;
    }else{

        color = selectColor.value;
    };

    if(selectBgColor.value == 'custom'){

        bgColor = `${customBgColR.value}-${customBgColG.value}-${customBgColB.value}`;
    }else{

        bgColor = selectBgColor.value;
    };

    let endpoint = `https://api.qrserver.com/v1/create-qr-code/?data=${url}&format=${format}&size=${size}&color=${color}&bgcolor=${bgColor}`;

    trimUrl(url, endpoint);
}

function trimUrl(url, endpoint){

    var domain = url.replace('http://','').replace('https://','').split(/[/?#]/)[0];

    displayCode(url, domain, endpoint);
}

function displayCode(url, domain, endpoint){

    let qrWrapper = document.getElementById('qrWrapper');

    qrWrapper.innerHTML = ``;

    qrWrapper.innerHTML = `
    
    <a href="${endpoint}" download="${domain} QR-Code">
        <img src="${endpoint}" alt="${url} QR-Code" id="qrCode">
    </a>
    `;
}