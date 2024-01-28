const firebaseConfig = {
    apiKey: "AIzaSyAoXTA3D0Z4WloDHJE5-5fmE8sGkTEzjNs",
    authDomain: "mesmerizing-app-307511.firebaseapp.com",
    databaseURL: "https://mesmerizing-app-307511-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mesmerizing-app-307511",
    storageBucket: "mesmerizing-app-307511.appspot.com",
    messagingSenderId: "367000966824",
    appId: "1:367000966824:web:bc7acbfada3c3f0b06149d",
    measurementId: "G-3VP1F9CGQX"
};

const fireBaseInit = firebase.initializeApp(firebaseConfig);

const dataBase = firebase.database();
const cldStorage = firebase.storage();

let loadDiv = document.getElementById("loadingHold");
let loadingCir = document.getElementById("loadCircle");

let chtarea = document.getElementById("chatArea");
let chtPane = document.getElementById("chattingPane");
let noChatsHold = document.getElementById("noChatsDiv");
let usrImgUrl = document.getElementById("photo");
let usrFallbackPic = document.getElementById("fallbackPhoto");

let saveMsgBtn = document.getElementById("saveMsgBtn");
let saveMsgCls = document.getElementById("saveMsgClose");

let mdlUsrShwBtn = document.getElementById("mdlShwBtn");
let mdlUsrsClsBtn = document.getElementById("mdlClsBtn");

let sidePnlBtn = document.getElementById("chatAreaTitle");

let userFormWrapper = document.getElementById("authUserWrap");
let topLoading = document.getElementById("topLoader");

let jmptoLogin = document.getElementById("jmpLogIn");
let jmptoSignUp = document.getElementById("jmpSignUp");

let authLoginUsrName = document.getElementById("validationLoginUserName");
let authLoginPass = document.getElementById("validationLoginPassword");
let authSignupUsrName = document.getElementById("validationSignupUserName");
let authSignupPass = document.getElementById("validationSignupPassword");

let authValdtbtn = document.getElementById("authValidated"); 

let clsLogIn = document.getElementsByClassName("login-auth")[0];

let logInusrName = document.getElementById("authUserName");
let signUpusrName = document.getElementById("authNewUserName");

let logInPass = document.getElementById("authPass");
let signUpPass = document.getElementById("authNewPass");

let chtGrpConverBtn = document.getElementById("chatGroup");

let modal = document.getElementById("myModal");
let imgAttachBtn = document.getElementById("fileAttachBtn");
let imageAttachHold = document.getElementById("mainImgAttach");
let span = document.getElementsByClassName("close")[0];
let hiddenDomClr = document.getElementById("dominentClrValue");

let filenameSpn = document.getElementById("fileName");

let imgLoader = document.getElementById("chatImgLoader");
let imgSrcSet = document.getElementById('imageIsLoaded');
let captTxt = document.getElementById("captionTxt");

let monitorSpn = document.getElementById("loadingMonitor");

let circleLoad = document.getElementById("CircularLoader");
let loaderPath = document.getElementById("LoaderPath");

let txtTggle = document.getElementById("textTgle");

let chtAreaMsg = document.getElementById("chtAreaMain");

let scrllToBtm = document.getElementById("scrollBottom");

let chtActionNotif = document.getElementById("chatActionNotifs");
let svgNotif = document.getElementById("svgNotifs");
let chatNotifTxt = document.getElementById("chatNotifText");

let sendBtn = document.getElementById("sendMsg");
let audioBtn = document.getElementById("record");
let stopBtn = document.getElementById("stopRecording");

let msgInpt = document.getElementById("message");
let replyClr = document.getElementById("rplyClr");
let replyMainDiv = document.getElementById("rplyClsEn");
let rplyDomElemId = document.getElementById("DomIdOfRplyElem");
let submit = document.getElementById("submit");

let clientAudio = document.getElementById('audioRec');
let recordTimeHold = document.getElementById("recordTimeDiv");

let audioDurMs = document.getElementById('audioDurationMs');
let audioDurSec = document.getElementById('audioDurationSec');
let audioDurMin = document.getElementById('audioDurationMin');

let imgUpload = document.getElementById("imageUpload");

let grpEditBtn = document.getElementById("editGrpInfo");
let grpDescInpt = document.getElementById("editedGrpDesc");

let grpFileReader = document.getElementById("grpProfileUpload");
let grpProfilePic = document.getElementById("grpImage");
let grpEditOverlay = document.getElementById("editOverlay");

let eOp = document.getElementById("editOpen");
let eCls = document.getElementById("editCls");

let usrFirstName = document.getElementById("firstNameInput");
let usrLastName = document.getElementById("lastNameInput");
let usrAboutStats = document.getElementById("usrAbout");
let editUsrChgBtn = document.getElementById("editUserDetails");

let editImage = document.getElementById("editImage");

let clsImgMdl = document.getElementById("clsMdl");
let imgchtAttach = document.getElementById("attachment");

let rplSpn = document.getElementById("rplySpn");
let rplyDbFromUsr = document.getElementById("rplyFrmUsr");

let userBioPrevw = document.getElementById("showUserBio");
let userNamePrevw = document.getElementById("showUserName");

let wrapper = document.getElementById("onlineState");
let offlineDiv = document.getElementById("offlineDiv");

let imgUsrName = document.getElementById("imageUserName");
let cUsrState = document.getElementById("currUsrState");

loadingCir.addEventListener("animationend", function() {
    wrapper.classList.add("appLoaded");
    loadingHold.remove();
});

function blurAllInputs() {
    let allDomInputs = document.querySelectorAll(`[contenteditable]`);
    allDomInputs.forEach((input) => {
        if (input.focus) input.blur();
    });
}

let onlineState = setInterval(function() {
    if (!navigator.onLine) {
        wrapper.classList.add("offline_page");
        offlineDiv.classList.add("isOffline");
        blurAllInputs();
        showSnackNotification({icon: 'wifi', notifAbout: 'Reconnecting...'});
    } else{
        wrapper.classList.remove("offline_page");
        offlineDiv.classList.remove("isOffline");
    }
}, 2500);

let usernameCookie = '';

function setCookie(_cookieName, _cookieVal, _exSec) {
    const currDate = new Date();

    currDate.setTime(currDate.getTime() + (_exSec*24*60*60*1000));

    let expires = `expires="${currDate.toGMTString()}"`;

    document.cookie = `${_cookieName}=${_cookieVal};${expires};path=/;Secure;SameSite=Strict"`;
}

function getCookie(cookieName) {
    const cookieArr = document.cookie.split(";");
    const cookieArrLen = cookieArr.length;

    for(let i = 0; i < cookieArrLen; ++i) {
        let cookiePair = cookieArr[i].split("=");

        if(cookieName === cookiePair[0].trim()) return decodeURIComponent(cookiePair[1]);
    }

    return;
}

function confirmCookie(cookieName) {
    let user = getCookie(`${cookieName}`);
    if (user) return true;
    return;
}

function loadUserDatabase() {
      loadUsrPreferences();
      loadUsrInformation();
      userPresenceState();
}

(function() {
    if (confirmCookie("username")) {
      userFormWrapper.remove();
      usernameCookie = getCookie("username");
      loadUserDatabase();
    }
})();

function lazyLoadByTimeout() {
    let loadLazily = setTimeout(function() {
        lazyLoadImg('lazy_load', 'img_loaded');
        clearTimeout(loadLazily);
    }, 2500);
}


function ChangeBtnText(text) {
    const textStr = text.toUpperCase();
    authValdtbtn.innerText = textStr;
}

function CheckAuthBtnValue(stringToCheck) {
    const authValdtbtnText = authValdtbtn.innerText.toLowerCase();
    const stringToCheckCase = stringToCheck.toLowerCase();

    if (authValdtbtnText === stringToCheckCase) return true;
    return;
}

function clearLoginValidate(){
    if (authLoginUsrName.classList.contains("validate-error")) {
        authLoginUsrName.classList.remove("validate-error");
        authValdtbtn.removeAttribute("disabled");
    }
}
function clearSignupValidate() {
    if (authSignupUsrName.classList.contains("validate-error")) {
        authSignupUsrName.classList.remove("validate-error");
        authValdtbtn.removeAttribute("disabled");
    }
}

logInusrName.addEventListener("keyup", clearLoginValidate);
signUpusrName.addEventListener("keyup", clearSignupValidate);

function clearAuthInfo(){
    logInusrName.value = '';
    signUpusrName.value = '';
    logInPass.value = '';
    signUpPass.value = '';

    clearLoginValidate();
    clearSignupValidate();
}

jmptoLogin.addEventListener("click", function() {
    clsLogIn.classList.add("animate-shutter-up");
    clsLogIn.classList.remove("animate-shutter-down");
    ChangeBtnText('Signup');
    clearAuthInfo();
});

jmptoSignUp.addEventListener("click", function() {
    clsLogIn.classList.add("animate-shutter-down");
    clsLogIn.classList.remove("animate-shutter-up");
    ChangeBtnText('Login');
    clearAuthInfo();
});

function CreateAvatar(initial) {
    let avatarCanvas = document.createElement("canvas");
    let avatarContext = avatarCanvas.getContext("2d");

    const initialLetter = initial[0];

    const randomAvatarClr = ["#5050ff","#50ff50","#ff5050","#ff5000","#ff0050","#0050ff","#00ff50","#50ff00","#5000ff"];

    const randomAvatarClrLen = randomAvatarClr.length;
    const random = Math.floor(Math.random() * randomAvatarClrLen);

    avatarCanvas.width = "200"
    avatarCanvas.height = "250";

    const avatarHeight = avatarCanvas.height;
    const avatarWidth = avatarCanvas.width;

    avatarContext.font = `${avatarWidth/2}px Arial`;
    avatarContext.textAlign = "center";

    avatarContext.fillStyle = "#ffffff";
    avatarContext.fillRect(0, 0, avatarWidth, avatarHeight);

    avatarContext.fillStyle = `${randomAvatarClr[random]}60`;
    avatarContext.fillRect(0, 0, avatarWidth, avatarHeight);

    avatarContext.fillStyle = randomAvatarClr[random];

    avatarContext.fillText(initialLetter, avatarWidth / 2, (65 / 100) * avatarHeight);

    let avatarUrl = avatarCanvas.toDataURL();
    avatarCanvas.remove();

    return avatarUrl;
}

function DefaultUserInfo() {

    const defUserPresence = "Online";

    const defUserBio = `Hey There I am ${usernameCookie}`;
    const defProfileImage = `${CreateAvatar(usernameCookie)}`;

    let defUserFname, defUserLname;

    defUserFname = defUserLname = '-';

    const defChatBackgorund = 'https://www.wallpaperflare.com/static/380/431/607/material-style-flatdesign-minimalism-material-wallpaper.jpg';
    const defChatAccentClr = '"#0086ff"';

    const userPresenceObj = {
        Presence: defUserPresence
    };
    const userDetailsObj = {
        UserDetails: {
            UserFirstName: defUserFname,
            UserLastName: defUserLname,
            UserBio: defUserBio,
            UserProfileImage: defProfileImage
        }
    };
    const userSettingsObj = {
        UserSettings: {
            ChatBackground: defChatBackgorund,
            ChatAccentColour: defChatAccentClr
        }
    };

    const defaultUserObj = {
        [usernameCookie]: {
            ...userPresenceObj,
            ...userDetailsObj,
            ...userSettingsObj
        }

    };

    console.log(defaultUserObj);

    if(CheckAuthBtnValue('signup')) {
        userDatabase.update(defaultUserObj);
    }
}

function errorLogingIn() {
    if (!authLoginPass.classList.contains("validate-error")) {
        authLoginUsrName.classList.add("validate-error");
        authValdtbtn.setAttribute("disabled", "true");
    }
}

function errorSigningUp() {
    if (!authSignupUsrName.classList.contains("validate-error")) {
        authSignupUsrName.classList.add("validate-error");
        authValdtbtn.setAttribute("disabled", "true");
    }
}

function validatationSuccess(cookieName) {
    topLoading.classList.add("top-loading-start");

    topLoading.addEventListener("animationend", function() {
        userFormWrapper.classList.add("cls-form");
        let usrWrapAnimate = setTimeout(() => {
            userFormWrapper.remove();
            clearTimeout(usrWrapAnimate);
        }, 2500);
    });

    setCookie("username", cookieName, 30);

    usernameCookie = getCookie("username");

    loadUserDatabase();
}

function ValidateUser(usrNameGet){

    const userDatabase = dataBase.ref(`Collo Chat/Users/Users Info`);
    userDatabase.once("value", (usrExists) => {
        let usrLoginFlag = false;
        let usrSignupFlag = false;

        const allExistsUsers = Object.keys(usrExists.val());
        const allExistsUsersLen = allExistsUsers.length;

        for (let i = 0; i < allExistsUsersLen; ++i) {
            if (CheckAuthBtnValue('login') && (allExistsUsers[i] === usrNameGet)) usrLoginFlag = true;
            else if (CheckAuthBtnValue('signup') && (allExistsUsers[i] !== usrNameGet)) usrSignupFlag = true;
        }

        if (!usrLoginFlag) errorLogingIn();
        if (!usrSignupFlag) errorSigningUp();

        if(usrSignupFlag || usrLoginFlag) validatationSuccess(usrNameGet);
    });
}

authValdtbtn.addEventListener("click", function() {
    const userVal = logInusrName.value || signUpusrName.value;
    ValidateUser(userVal);
});

function lazyLoadImg(imgsElems, imgsElemsLoded) {
    let lazyLoads = document.getElementsByClassName(`${imgsElems}`);
    let lazyLoadsLen = lazyLoads.length;

    for (let i = 0; i < lazyLoadsLen; ++i) {
        let lazyLoadSrc = lazyLoads[i].getAttribute("data-src");

        if (lazyLoads[i].src !== lazyLoadSrc) {

            lazyLoads[i].setAttribute("src", `${lazyLoadSrc}`);
            lazyLoads[i].removeAttribute("data-src");

            lazyLoads[i].addEventListener("load", function() {
                this.classList.add(`${imgsElemsLoded}`);
                this.classList.remove(`${imgsElems}`);
            });
        }

    }
}

function InChatActionsNotif({Icon: icon, Text: txt}) {

    chtActionNotif.classList.add("chat-action-notifs-show");

    svgNotif.innerHTML = `${icon}`;
    chatNotifTxt.innerText = txt;

    RemoveClassWithTime("chat-action-notifs", "chat-action-notifs-show", 4000);
}

let conversationId = '';

const conversationMsg = document.querySelectorAll(".msg");

conversationMsg.forEach((msgBtn) => {

    msgBtn.addEventListener("click", function() {

        chtPane.classList.add("visible_chats");
        noChatsHold.style.display = 'none';


        removeChilds(chtAreaMsg);
    });

    msgBtn.addEventListener("click", function(){
        const msgBtnId = msgBtn.getAttribute("data-id");

        conversationId = msgBtnId;
        FetchingMainChat(msgBtnId);
    });

});

function removeChilds(parent) {
    while(parent.firstChild){
        parent.firstChild.remove();
    }
}

ActiveElement({Elemname: '.msg', ClassName: 'online', Event: "click"});

let fnAppendLight = function() {
    lazyLoadImg('img_light', 'image_appended');
};

let fnAppendDark = function() {
    lazyLoadImg('img_dark', 'image_appended');
};

let fnAppendTexture = function() {
    lazyLoadImg('img_texture', 'image_appended');
};

let pillLight = document.getElementById("evtTagLight");
let pillDark = document.getElementById("evtTagDark");
let pillCustom = document.getElementById("evtTagCustom");

function bgTabOpen(bgTagId) {
    let bgId = document.getElementById(`${bgTagId}`);

    let swtchBgs = document.getElementsByClassName("swtch_bgs");
    let swtchBgsLen = swtchBgs.length

    for (let i = 0; i < swtchBgsLen; ++i) swtchBgs[i].classList.remove("swtch_bgs_actv");

    bgId.classList.add("swtch_bgs_actv")
}

pillLight.addEventListener("click", function() {
    bgTabOpen('tagLight');
});
pillDark.addEventListener("click", function() {
    bgTabOpen('tagDark');
    fnAppendDark();
});
pillCustom.addEventListener("click", function() {
    bgTabOpen('tagTextr');
    fnAppendTexture();
});


pillLight.addEventListener("click", function() {
    pillLight.removeEventListener("click", fnAppendLight);
});
pillDark.addEventListener("click", function() {
    pillLight.removeEventListener("click", fnAppendDark);
});
pillCustom.addEventListener("click", function() {
    pillLight.removeEventListener("click", fnAppendTexture);
});

ActiveElement({Elemname: ".grid_img_hold img.bg_tags_imgs", ClassName: "bg_img_setted", Event: "click"});
ActiveElement({Elemname: ".pill_btns", ClassName: "actvBgTag", Event: "click"});

function sidePanelSlide(sidePanel, state, classname) {
    let slideDiv = document.getElementById(`${sidePanel}`);

    if(!state) slideDiv.classList.remove(`${classname}`);
    else slideDiv.classList.add(`${classname}`);
}

mdlUsrShwBtn.addEventListener("click", fnAppendLight);

mdlUsrShwBtn.addEventListener("click", function() {
    sidePanelSlide("mainUsrMdl", true, "animation");
});

mdlUsrsClsBtn.addEventListener("click", function() {
    sidePanelSlide("mainUsrMdl", false, "animation");
    mdlUsrShwBtn.removeEventListener("click", fnAppendLight);
});

eOp.addEventListener("click", function() {
    sidePanelSlide("editUsrMdl", true, "edit_animation");
});

eCls.addEventListener("click", function() {
    sidePanelSlide("editUsrMdl", false, "edit_animation");
});

function ActiveElement({Elemname: elemN, ClassName: clsName, Event: evtName}) {
    let elems = document.querySelectorAll(elemN);
    let elemsLen = elems.length;

    for (let i = 0; i < elemsLen; ++i) {
      elems[i].addEventListener(`${evtName}`, function(prvtDefEvt) {

        prvtDefEvt.preventDefault();

        let crntCls = document.getElementsByClassName(clsName);

        if (crntCls.length > 0) crntCls[0].className = crntCls[0].className.replace(` ${clsName}`, "");

        this.className += ` ${clsName}`;
      });
    }
}

function RemoveClassWithTime(elements, removingClass, time) {

    let rmvClsElems = document.getElementsByClassName(`${elements}`);
    const rmvClsElemsLen = rmvClsElems.length;

    const removeClass = setTimeout(() => {
        for (let i = 0; i < rmvClsElemsLen; ++i) rmvClsElems[i].classList.remove(removingClass);
        clearTimeout(removeClass);
    }, time);
}

function focusTextBox(wToogle) {
   if(wToogle) {
         msgInpt.focus();
    } else {
        msgInpt.blur();
    }
}

function setReply({
    TextReply: txtReply,
    ImageReply: imgReply,
    FromUserReply: usrFrmRply,
    AccentColor: accColor
}) {
    let rplyUsrFrm = document.getElementById("rplyFrmUsr");
    let replySpnVar = document.getElementById("rplySpn");
    let replyLftLine = document.getElementById("textRplylftLine");

    let rplyImageHolder = document.getElementById("replYImageDiv");
    let rplyImage = document.getElementById("repliedImage");

    rplyUsrFrm.innerText = usrFrmRply;

    rplyUsrFrm.style.color = `${accColor}`;
    replyLftLine.style.backgroundColor = `${accColor}`;

    replySpnVar.innerHTML = txtReply;

    if(imgReply) {
        rplyImage.src = imgReply;
        rplyImageHolder.classList.add("visible_now");
    } else {
        rplyImageHolder.classList.remove("visible_now");
        rplyImage.removeAttribute("src");
    }

    if (!replyMainDiv.classList.contains("replyEnabled") && replySpnVar.innerText) replyMainDiv.classList.add("replyEnabled");

    focusTextBox(true);
}

function showSnackNotification({
    icon: icn,
    notifAbout: infTxt,
}) {

    let snackBar = document.getElementById("snackBar");
    let snackIcon = document.getElementById("snackIcon");
    let snackInfo = document.getElementById("snackInfo");

    let widthSnack = document.getElementById("widthInd");

    snackIcon.innerText = icn;
    snackInfo.innerText = infTxt;

    snackBar.classList.add("slide_in_snack");
    snackBar.classList.remove("slide_out_snack");

    widthSnack.classList.add("animate_width");

    widthSnack.addEventListener("animationend", function() {
        snackBar.classList.remove("slide_in_snack");
        snackBar.classList.add("slide_out_snack");
        widthSnack.classList.remove("animate_width");
    });

}

imgAttachBtn.addEventListener("click", function() {
    imgSrcSet.src = '';
    captTxt.value = '';

    imgchtAttach.click();

    focusTextBox(false);
});

function ButtonScaleAnimation(recordBtnScale, stoprecordBtnScale, sendMsgBtnScale) {
    audioBtn.style.transform = `scale(${recordBtnScale})`;
    stopBtn.style.transform = `scale(${stoprecordBtnScale})`;
    sendBtn.style.transform = `scale(${sendMsgBtnScale})`;
}

msgInpt.addEventListener("keyup", function() {
    if (this.innerText.trim().length > 0) ButtonScaleAnimation(0, 0, 1);
    else ButtonScaleAnimation(1, 0, 0);
});

msgInpt.addEventListener("keydown", function(entEvt){
    if (this.innerText.trim().length > 0)  {
        if (entEvt.code === 'Enter' && !entEvt.shiftKey) {
            entEvt.preventDefault();
            SendMessage(conversationId);
        }
    } else {
        if (entEvt.code === 'Enter' && !entEvt.shiftKey) entEvt.preventDefault();
        if(entEvt.code === 'Space') entEvt.preventDefault();

        return false;
    }

    if(entEvt.code === 'Control' && entEvt.code === 'b') {
        document.execCommand("bold", false, null);
    }

    if(entEvt.code === 'Control' && entEvt.code === 'i') {
        document.execCommand("italic", false, null);
    }

    if(entEvt.code === 'Control' && entEvt.code === 'u') {
        document.execCommand("underline", false, null);
    }
});

(function() {
    let offset = 0;
    let paused = true;
    let mediaRecorder = null;

    showRecordTime();

    function startRecordTime() {
      if (paused) {
        paused = false;
        offset = offset - Date.now();
        showRecordTime();
      }
    }

    function stopRecordTime() {
        if (!paused) {
            paused = true;
            offset += Date.now();
        }
    }
    function resetRecordTime() {
        if (paused) {
            offset = 0;
            showRecordTime();
        } else offset = -Date.now();
    }

    function format(value, scale, modulo, padding) {
        value = Math.floor(value / scale) % modulo;
        return value.toString().padStart(padding, 0);
    }

    function showRecordTime() {
        const value = paused ? offset : Date.now() + offset;
        audioDurMs.innerText = format(value, 1, 1000, 3);
        audioDurSec.innerText = format(value, 1000, 60, 2);
        audioDurMin.innerText = format(value, 60000, 60, 2);

        if(!paused) requestAnimationFrame(showRecordTime);
    }

    audioBtn.addEventListener('click', function () {

        recordTimeHold.classList.add("is-recording");

        let constraints = {audio: true};

        navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            let mediaRecorder = new MediaRecorder(stream);
            let chunks = [];

            mediaRecorder.start();
            ButtonScaleAnimation(0, 1, 0);
            startRecordTime();

            mediaRecorder.addEventListener('dataavailable', function (dataEvtAudio) {
                const evtData = dataEvtAudio.data;
                chunks.push(evtData);
            });

            mediaRecorder.addEventListener('stop', function () {
                let audFile = new FileReader();
                let blob = new Blob(chunks, {type: 'audio/ogg; codecs=opus'});

                audFile.addEventListener("load", function() {
                    let base64AudioURL = audFile.result;
                    clientAudio.src = base64AudioURL;
                    SendAudio(conversationId);
                });

                msgInpt.contentEditable = "true";

                audFile.readAsDataURL(blob);
                chunks = [];
            });

            stopBtn.addEventListener('click', function () {
                mediaRecorder.stop();
                stream.getTracks().forEach(track => track.stop());
                stopRecordTime();
                resetRecordTime();

                ButtonScaleAnimation(1, 0, 0);

                recordTimeHold.classList.remove("is-recording");
            });
        });
    });
})();

submit.addEventListener("click", function() {
    SendImage(conversationId);
});

replyClr.addEventListener("click", function() {
    setReply({
        TextReply: '',
        ImageReply: '',
        FromUserReply: '',
    });
    replyMainDiv.classList.remove("replyEnabled");
});

let compressImg = {
    compress: function(t, e, n) {
        let a = "image/jpeg";
        "undefined" != typeof n && "png" == n && (a = "image/png");
        let r = document.createElement("canvas");
        r.width = t.naturalWidth, r.height = t.naturalHeight;
        let o = (r.getContext("2d").drawImage(t, 0, 0), r.toDataURL(a, e / 100)),
            s = new Image;
        return s.src = o, s;
    }
};

scrllToBtm.addEventListener("click", () => chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight);

function EditUserDetails(){
    usrFirstName.removeAttribute("disabled");
    usrLastName.removeAttribute("disabled");
    usrAboutStats.removeAttribute("disabled");

    editUsrChgBtn.removeEventListener("click", EditUserDetails);
    editUsrChgBtn.addEventListener("click", SaveUserDetails);

    editUsrChgBtn.innerText = "done";
}

editUserDetails.addEventListener("click", EditUserDetails);

function SaveUserDetails(){
    const userDetailsSaveDb = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/UserDetails`);

    usrFirstName.setAttribute("disabled", "true");
    usrLastName.setAttribute("disabled", "true");
    usrAboutStats.setAttribute("disabled", "true");

    userDetailsSaveDb.update({
        UserFirstName: usrFirstName.value,
        UserLastName: usrLastName.value,
        UserBio: usrAboutStats.value
    }).then(() => {
        showSnackNotification({icon: "settings", notifAbout: "Changes Saved"});
    });

    editUsrChgBtn.removeEventListener("click", SaveUserDetails);

    editUsrChgBtn.addEventListener("click", EditUserDetails);

    editUsrChgBtn.innerText = "edit";
}

imgUpload.addEventListener("change", function(fileEvt) {
    let oneFile = fileEvt.target.files[0];

    let imgBlob = URL.createObjectURL(oneFile);

    let usrPrfImgLoad = document.getElementById("usrPrfImage");
    let usrPrfImgLoadCir = document.getElementById("usrPrfImageCircleLoad");
    let usrPrfImgLoadCirpath = document.getElementById("usrPrfImageLoadPath");
    let monoChrmeIco = document.getElementById("changeToLoad");

    ImageLoaderState(usrPrfImgLoad, usrPrfImgLoadCir, usrPrfImgLoadCirpath, true);

    let imgRef = cldStorage.ref(`${usernameCookie}/${usernameCookie}_Profile`);

    let userPrfImg = imgRef.put(oneFile, {contentType: oneFile.type});

    editImage.src = imgBlob;
    usrImgUrl.src = imgBlob;
    usrFallbackPic.src = imgBlob;

    document.getElementById("changeToLoad").innerText = '';

    userPrfImg.on("state_changed", function(prfImgSnp) {
        const prfBytesTrans =  prfImgSnp.bytesTransferred;
        const prfTotalBytes = prfImgSnp.totalBytes;

        prfImgLoadNums.innerText = `${Math.round((prfBytesTrans/prfTotalBytes)*100)}%`;
    });

    userPrfImg.then(function(usrImgSnp) {
        usrImgSnp.ref.getDownloadURL().then((url) => {
            const dbUsrsAbout = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/UserDetails`);
            dbUsrsAbout.update({UserProfileImage: url});
            ImageLoaderState(usrPrfImgLoad, usrPrfImgLoadCir, usrPrfImgLoadCirpath, false);
            monoChrmeIco.innerText = 'monochrome_photos';
        });
    });
});

function loadUsrInformation() {
    const dbUsrsAbout = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/UserDetails`);

    dbUsrsAbout.on('value', (usrAbtSnp) => {
        let userDetailsSnapShot = usrAbtSnp.val();

        const userBioValue = userDetailsSnapShot?.UserBio;
        const userPic = userDetailsSnapShot?.UserProfileImage;

        userNamePrevw.innerText = usernameCookie;
        imgUsrName.innerText = usernameCookie;

        userBioPrevw.innerText = userBioValue;

        usrAboutStats.value = userBioValue;

        usrFirstName.value = userDetailsSnapShot?.UserFirstName || '-';
        usrLastName.value = userDetailsSnapShot?.UserLastName || '-';

        usrImgUrl.setAttribute("src", `${userPic}`);
        editImage.setAttribute("src", `${userPic}`);

        usrFallbackPic.setAttribute("style", `background-image: url(${userPic})`);
    });

}

(function() {
    const userSettings = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/UserSettings`);
    const toggleButton = document.querySelector(".dark-light");
    const clrThemes = document.querySelectorAll(".color");

    let chatAppTheme = 'light';
    let chtClr = 'blue';

    let userBgImg = document.querySelectorAll(".grid_img_hold img.bg_tags_imgs");
    let bdBody =  document.querySelector("body");

    userBgImg.forEach(image=>{
        image.addEventListener("click", function() {
            const imageAttr = image.getAttribute("src");

            userSettings.update({
                ChatBackground: `${imageAttr}`
            });
        });
    });

    clrThemes.forEach((color) => {
        color.addEventListener("click", function() {
            const theme = color.getAttribute("data-color");

            clrThemes.forEach((c) => c.classList.remove("selected"));

            document.body.setAttribute("data-theme", theme);
            color.classList.add("selected");
            userSettings.update({ChatAccentColour: theme});
        });
    });

    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) chatAppTheme = 'dark';
        else chatAppTheme = 'light';

        userSettings.update({AppTheme: chatAppTheme});
    });

})();


function loadUsrPreferences() {
    const dbUsrsSettings = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/UserSettings`);

    dbUsrsSettings.on('value', (usrThmeSnp) => {
        const themeSnap = usrThmeSnp.val();

        let colorThemes = document.querySelectorAll(".color");

        const chatAppBackground = themeSnap?.ChatBackground;
        const chatAccentColor = themeSnap?.ChatAccentColour;

        const accentColorsArray = ['#0086ff', '#9f7aea', '#38b2ac', '#ed8936', '#ff69b4', '#80bfff', '#ff6666', '#04a96a'];
        const accentColorsArrayLen = accentColorsArray.length;

        const dbBoolThemeExsits = usrThmeSnp.child('AppTheme').exists();

        if (dbBoolThemeExsits) {
            if (themeSnap.AppTheme === 'dark') document.body.classList.add("dark-mode");
            else document.body.classList.remove("dark-mode");
        } else document.body.classList.remove("dark-mode");

        chtarea.style.backgroundImage = `url("${chatAppBackground}")`;
        document.body.setAttribute("data-theme", chatAccentColor);

        for (let i = 0; i < accentColorsArrayLen; ++i) {
            colorThemes[i].classList.remove("selected");
            if(chatAccentColor === accentColorsArray[i]) colorThemes[i].classList.add("selected");
        }
    });
}

function LastSeenTime() {
    const dateOffline = new Date();
    let usrLastHrs = dateOffline.getHours();
    let usrLastMins = dateOffline.getMinutes();
    let usrLastSecs = dateOffline.getSeconds();

    if(usrLastHrs < 10) usrLastHrs = `0${usrLastHrs}`;
    if(usrLastMins < 10) usrLastMins = `0${usrLastMins}`;
    if(usrLastSecs < 10) usrLastSecs = `0${usrLastSecs}`;

    const lastSeenStr = `Last Seen at ${usrLastHrs}:${usrLastMins}:${usrLastSecs}`;

    return lastSeenStr;
}

function userPresenceState() {

    const userStatusRef = dataBase.ref(`Collo Chat/Users/Users Info/${usernameCookie}/Presence`);

    userStatusRef.set({
       Status: "Online"
    });

    userStatusRef.on('value', (usrState) => {

        const userLastSeen = LastSeenTime();

        const userStatus = {
           Status: userLastSeen
        };

        if (usrState.val() === false) return;

        userStatusRef.onDisconnect().update(userStatus);
    });
}

function getOnlineUsers() {
    const applicationUsersdb = dataBase.ref("Collo Chat/Users/Users Info");

    applicationUsersdb.on('value', (userOnline) => {
        let dbFetchOnline = userOnline.val();

        let totalMembers = Object.keys(dbFetchOnline);
        let totalMembersLen = totalMembers.length;

        let memOnlineCnt = 0;

        let memberNumber = document.getElementById("MemNum");
        let onceMemberOnline = document.getElementById("MemOnline");

        memberNumber.innerText = `${totalMembersLen}`;

        for (let i = 0; i < totalMembersLen; ++i) {
            if (dbFetchOnline[totalMembers[i]].Presence?.Status === 'Online') memOnlineCnt = ++memOnlineCnt;

            if (memOnlineCnt > 1) onceMemberOnline.innerText = memOnlineCnt-1;
            else onceMemberOnline.innerText = 'No one is ';
        }
    });
}
getOnlineUsers();

function getMembersLists() {
    const mainApplicationdb = dataBase.ref("Collo Chat/Users/Users Info");

    mainApplicationdb.once('value', (usersSnaps) => {

        let dbFetchKeys = usersSnaps.val();

        let usrWeb = Object.keys(dbFetchKeys);

        let usrWebLen = usrWeb.length;

        let userStatusArr = [];
        let userImgUrlArr = [];
        let userPresence = [];

        let membersListH = document.getElementById("membersListHolder");

        for (let i = 0; i < usrWebLen; ++i) {
            let users = usrWeb[i];

            let mainListHold = document.createElement("div");
            let memImgHold = document.createElement("div");
            let memImg = document.createElement("img");

            let memNameHolder = document.createElement("span");
            let memStatus = document.createElement("span");
            let memAbout = document.createElement("div");

            mainListHold.classList.add("member_info_holder");
            memImgHold.classList.add("grp_member_img_div");

            memNameHolder.classList.add("user_name_span");
            memAbout.classList.add("user_online_state");

            if(usersSnaps.child(`${users}/UserDetails/UserProfileImage`).exists()) userImgUrlArr.push(dbFetchKeys[users]?.UserDetails?.UserProfileImage);
            else userImgUrlArr.push('https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png');

            if(usersSnaps.child(`${users}/Presence`).exists()) userPresence.push(dbFetchKeys[users]?.Presence?.Status);
            else userPresence.push("Last Seen Recently");

            if(usrWeb[i] === usernameCookie) memNameHolder.innerText = 'Me';
            else memNameHolder.innerText = usrWeb[i];

            let slicedHrs = userPresence[i].slice(13, 15);
            let slicedMins = userPresence[i].slice(16, 18);

            if (userPresence[i] !== "Online") {
                memStatus.innerText = `${slicedHrs}:${slicedMins}`;
            } else{
                memStatus.innerText = "Online";
                memAbout.classList.add("online_mem");
            }

            memImg.setAttribute("src", userImgUrlArr[i]);

            memImgHold.appendChild(memImg);
            mainListHold.appendChild(memImgHold);

            mainListHold.appendChild(memNameHolder);
            memAbout.appendChild(memStatus);
            mainListHold.appendChild(memAbout);
            membersListH.appendChild(mainListHold);
        }
        realTimeuserPresence();
    });
}

function realTimeuserPresence() {
    const allUserStatus = dataBase.ref("Collo Chat/Users/Users Info");

    let memberOnline = document.getElementById("MemOnline");

    allUserStatus.on("value", function(usrStatus) {
        let staticMemPresence = document.getElementsByClassName("member_info_holder");
        let staticMemPresenceLen = staticMemPresence.length;

        let memOnlineArr = [];
        let memOnlineNum = 0;

        const allusrArr =  usrStatus.val();

        const allUsrs = Object.keys(allusrArr);
        const allUsrsLen = allUsrs.length;

        for (let i = 0; i < allUsrsLen; ++i) {
            memOnlineArr.push(allusrArr[allUsrs[i]].Presence?.Status);

            let staticMemList = staticMemPresence[i].getElementsByClassName("user_online_state")[0];
            let staticMemSpn = staticMemList.getElementsByTagName("span")[0];

            if(allusrArr[allUsrs[i]].Presence?.Status === "Online") {
                staticMemSpn.innerText = 'Online';
                staticMemList.classList.add("online_mem");
            } else{
                staticMemSpn.innerText = `${allusrArr[allUsrs[i]].Presence?.Status.slice(0, -3)}`;
                staticMemList.classList.remove("online_mem");
            }
        }
    });
}

function groupPanel() {
    let sidePnl = document.getElementById("sidePanel");
    sidePnl.classList.toggle("show_panel");
    sidePnlBtn.removeEventListener("click", getMembersLists);
}

sidePnlBtn.addEventListener("click", getMembersLists);

sidePnlBtn.addEventListener("click", groupPanel);

function userPostTime() {
    const chtDate = new Date();

    const chtHrs = chtDate.getHours();
    const chtMins = chtDate.getMinutes();

    const chtMinsTern = (chtMins<10?"0":"")+chtMins;
    let parseHr = parseInt(chtHrs);

    if (parseHr > 12) parseHr = parseHr - 12;

    const parseHrTern = (parseHr<10?"0":"")+parseHr;

    const meredian = (chtHrs<=11?"am":"pm");

    const timeStr = `${parseHrTern.toString()}:${chtMinsTern} ${meredian}`;

    return timeStr;
}

function afterPostFunctions() {
    msgInpt.innerText = '';

    chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;

    setReply({
        TextReply: '',
        ImageReply: '',
        FromUserReply: '',
    });
}

function generateUniqueId(){
    const msgDatId = Date.now();
    return msgDatId;
}

function SendMessage(sendMsgKey) {
    const rplyAccClr = rplyDbFromUsr.style.color;

    const rplyChkDb = rplSpn.innerHTML?rplSpn.innerHTML:"";
    const getReply  = rplyDbFromUsr.innerText?rplyDbFromUsr.innerText:"";

    const rplImage = document.getElementById("repliedImage").src;
    const getReplyImage = rplImage?rplImage:"";

    const textDomCorresId = rplyDomElemId.value;
    const msgInptVal = msgInpt.innerHTML;

    const getUniqueIdforText = generateUniqueId();
    const usrPostTime = userPostTime();

    const grpChatsDb = dataBase.ref(`Collo Chat/Groups/${sendMsgKey}/Group Chats/${getUniqueIdforText}`);

    const defaultMessageObject = {
        User: usernameCookie,
        Message: msgInptVal,
        PostTime: usrPostTime,
        DomId: getUniqueIdforText
    };


    if(getReply && getReplyImage) {

        const replyImageObject = {
            ReplyAccentClr: rplyAccClr,
            ReplyString: rplyChkDb,
            ReplyImage: getReplyImage,
            ReplyOfUser: getReply,
            DomCorresId: textDomCorresId
        };
        const asssignedReplyImageObject = Object.assign({}, defaultMessageObject, replyImageObject);

        grpChatsDb.set(asssignedReplyImageObject);
    }

    if(getReply && !getReplyImage) {

        const onlyReplyObject = {
            ReplyAccentClr: rplyAccClr,
            ReplyString: rplyChkDb,
            ReplyOfUser: getReply,
            DomCorresId: textDomCorresId
        };
        const asssignedOnlyReplyObject = Object.assign({}, defaultMessageObject, onlyReplyObject);

        grpChatsDb.set(asssignedOnlyReplyObject);
    }

    if(!getReply && !getReplyImage) {
        grpChatsDb.set(defaultMessageObject);
    }

    afterPostFunctions();
}

function ImageLoaderState(mainLoader, circleLoader, circleLoderPath, loadBool) {
    if (loadBool) {
        mainLoader.classList.add("image_is_loading");
        circleLoader.classList.add("circular_loader_start");
        circleLoderPath.classList.add("loader_path_start");
    } else{
        mainLoader.classList.remove("image_is_loading");
        circleLoader.classList.remove("circular_loader_start");
        circleLoderPath.classList.remove("loader_path_start");
    }
}

function SendImage(sendMsgImg){
  const getImgSrcCht = imgSrcSet.src;

  if (getImgSrcCht) {
      const imgrplSpn = document.getElementById("rplySpn");
      const imgrplDb = imgrplSpn.innerText?imgrplSpn.innerText:"";

      const imagePostTime = userPostTime();

      const holderHeight = `${imgSrcSet.height}px`;
      const holderWidth = `${imgSrcSet.width}px`;

      const domHinptClr = hiddenDomClr.value;

      const imgName = filenameSpn.innerText;

      const captTxtVal = captTxt.value;
      const imageDomCorresId = rplyDomElemId.value;

      const getUniqueIdforImg = generateUniqueId();

      const dbRefImg = dataBase.ref(`Collo Chat/Groups/${sendMsgImg}/Group Chats/${getUniqueIdforImg}`);

      const chatImageObject = {
          User: usernameCookie,
          ReplyString: imgrplDb,
          ImageUrl: getImgSrcCht,
          ImageName: imgName,
          ImageHoldHeight: holderHeight,
          ImageHoldWidth: holderWidth,
          ImageDominentClr: domHinptClr,
          Message: captTxtVal,
          PostTime: imagePostTime,
          DomId: getUniqueIdforImg,
          DomCorresId: imageDomCorresId
        };

      dbRefImg.set(chatImageObject);

      afterPostFunctions();
  }
    modal.style.display = 'none';
    submit.setAttribute("disabled", "true");
}

function SendAudio(sendMsgAudio) {
    const getUniqueIdforAudio = generateUniqueId();
    const audioUrltoPost = document.getElementsByClassName("audio-msg")[0].src;
    const audioPostTime  = userPostTime();

    const dbRefAudio = dataBase.ref(`Collo Chat/Groups/${sendMsgAudio}/Group Chats/${getUniqueIdforAudio}`);

    const chatAudioObject = {
        User: usernameCookie,
        AudioURL: audioUrltoPost,
        PostTime: audioPostTime,
        DomId: getUniqueIdforAudio
    };

    dbRefAudio.set(chatAudioObject);

    afterPostFunctions();
}

function UploadImageFile(imageFile) {
    const uploadTask = cldStorage.ref(`Group Messages Images/${imageFile.name}`).put(imageFile, {contentType: imageFile.type});

    const objectUrl = URL.createObjectURL(imageFile);

    let tempImage = new Image();

    tempImage.src = objectUrl;

    tempImage.addEventListener("load", function() {

        const dominentClrCanvas = document.createElement("canvas");
        const dominentClrCanvas2d = dominentClrCanvas.getContext("2d");

        let imgDominentClr;
        let clrValues;

        dominentClrCanvas2d.drawImage(imgSrcSet, 0, 0, 1, 1);
        clrValues = dominentClrCanvas2d.getImageData(0, 0, 1, 1).data;

        dominentClrCanvas.remove();

        imgDominentClr = `rgba(${clrValues[0]}, ${clrValues[1]}, ${clrValues[2]}, ${clrValues[3]})`;

        hiddenDomClr.value = imgDominentClr;
    });

    ImageLoaderState(imgLoader, circleLoad, loaderPath, true);

    imgSrcSet.classList.remove("image_is_loaded");

    imgSrcSet.src = objectUrl;

    imgLoader.addEventListener("click", function() {
        uploadTask.cancel();
        monitorSpn.innerText = '';
        modal.style.display = 'none';
    });

    filenameSpn.innerText = imageFile.name;

    uploadTask.on("state_changed", function(imageStateSnp) {
        const bytesTransfer = imageStateSnp.bytesTransferred;
        const fileSize = imageStateSnp.totalBytes;
        const percentageCalc = Math.round((bytesTransfer/fileSize)*100);

        monitorSpn.innerText = `${percentageCalc}%`;
    });

    uploadTask.then((imgSnp) => {
        imgSnp.ref.getDownloadURL().then((cldImgUrl) => {
            imgSrcSet.setAttribute("src", `${cldImgUrl}`);
            ImageLoaderState(imgLoader, circleLoad, loaderPath, false);
            imgSrcSet.classList.add("image_is_loaded");
            submit.removeAttribute("disabled");
        });
    });
}

imgchtAttach.addEventListener("change", function(chtMsgEvt) {
    const chkFile = chtMsgEvt.target.files[0];
    if(chkFile) {
        modal.style.display = "block";
        UploadImageFile(chkFile);
    }
});

chtarea.addEventListener("dragover", function(dragEvt) {
    dragEvt.preventDefault();
    modal.style.display = "block";
});

imageAttachHold.addEventListener("dragenter", function(mainDrgEvt) {
    mainDrgEvt.preventDefault();
    imageAttachHold.classList.add("file_drag");
});

imageAttachHold.addEventListener("dragleave", function(mainDrgEvt) {
    mainDrgEvt.preventDefault();
    imageAttachHold.classList.remove("file_drag");
});

imageAttachHold.addEventListener("drop", function(dropHandle) {
    dropHandle.preventDefault();
    const fileTypeArr = ['image/png', 'image/jpeg', 'image/jpg'];

    let dataTransItems = dropHandle.dataTransfer.items;
    let getFile = dropHandle.dataTransfer.files[0];

    UploadImageFile(getFile);
    imageAttachHold.classList.remove("file_drag");
});

imgchtAttach.addEventListener("focus", function() {
    submit.setAttribute("disabled", "true");
});

clsImgMdl.addEventListener("click", function() {
    modal.style.display = 'none';
    filenameSpn.innerText = "File Name";
});

function ReplyMessageClass(rplyParent) {

    rplyParent.classList.add("replyingCurr");

    let clsReplySet = setTimeout(() => {
        rplyParent.classList.remove("replyingCurr");
        clearTimeout(clsReplySet);
    }, 1000);

    focusTextBox(true);
}

function ReplyMessage(accentClr, elemTxt, frmUsr, imageRply) {
    const setReplyObj = {
        AccentColor: accentClr,
        TextReply: elemTxt,
        FromUserReply: frmUsr
    };

    if(imageRply) {
        const imgObj = {ImageReply: imageRply};
        const imageReplyObj = Object.assign({}, setReplyObj, imgObj);
        setReply(imageReplyObj);
    } else setReply(setReplyObj);
}

function getAccentClrDB(fromUserName) {
    const userAccentClr = dataBase.ref(`Collo Chat/Users/Users Info/${fromUserName}/UserSettings`);
    console.log("fromUserName", fromUserName);

    let getColorTheme;

    userAccentClr.once("value", function(getColor) {
        getColorTheme = getColor.val().ChatAccentColour;
        console.log("getColor.val()", getColor.val());
    });

    return getColorTheme;
}

function addSelectClass() {

    ActiveElement({Elemname: '.chat-msg', ClassName: 'selected_message', Event: "contextmenu"});

    RemoveClassWithTime("chat-msg", "selected_message", 5000);
}

function validURL(str) {
  let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function FetchingMainChat(dataKey) {

    const fetchChat = dataBase.ref(`Collo Chat/Groups/${dataKey}/Group Chats`);

    fetchChat.on("child_removed", function(delSnpVal) {
        const dbDeleteMsg = delSnpVal.val();
        const dbDeleteMsgId = dbDeleteMsg.DomId;

        let rmvelem = document.getElementById(`${dbDeleteMsgId}`);

        let msgBubble = rmvelem.parentElement.parentElement;

        if (dbDeleteMsg.ImageUrl) {
            let delImgFile = cldStorage.ref(`Group Messages Images/${dbDeleteMsg.ImageName}`);

            delImgFile.delete();

            msgBubble.classList.add("chat-bubble-removed");

            let dbDelTimeoutImg = setTimeout(()=> {
                msgBubble.remove();
                clearTimeout(dbDelTimeoutImg);
            }, 350);

        } else{
            msgBubble.parentElement.classList.add("chat-bubble-removed");

            let dbDelTimeout = setTimeout(()=> {
                msgBubble.parentElement.remove();
                clearTimeout(dbDelTimeout);
            }, 350);
        }

    });

    fetchChat.on("child_changed", function(chngChildSnp) {
        let chngChildVal = chngChildSnp.val();
        let chngChildId = chngChildVal.DomId;
        let chngChildMsg = chngChildVal.Message;

        let chngElem = document.getElementById(chngChildId);
        chngElem.innerText = chngChildMsg;
    });

    let onvaluefn =  function (dbChatSnp, prevChildKey) {
        let dbFetch = dbChatSnp.val();

        function CheckPrevUser() {
            let prevUser = false;
            fetchChat.child(`${prevChildKey}`).once("value", function(prevChildSnp) {
                let prevChildValue = prevChildSnp.val();
                prevUser = (prevChildValue?.User === dbFetch?.User)?true:false;
            });
            return prevUser;
        }

        if (!dbFetch.contentInfo) {
            const dbFetchMsg = dbFetch.Message;
            const dbFetchTime = dbFetch.PostTime;
            const dbFetchUser = dbFetch.User;
            const dbFetchId = dbFetch.DomId;
            const dbFetchRply = dbFetch.ReplyString;
            const dbFetchRplyImage = dbFetch.ReplyImage;
            const dbFetchImage = dbFetch.ImageUrl || '';
            const dbFetchAudio = dbFetch.AudioURL || '';
            const dbFetchScrollToId = dbFetch.DomCorresId || '';
            const dbFetchImageHeight = dbFetch.ImageHoldHeight || '';
            const dbFetchImageWidth = dbFetch.ImageHoldWidth || '';

            const getCookieDb = usernameCookie;

            let lstMsg = document.getElementById(`${dataKey}lastMsg`);
            let lstMsgtime = document.getElementById(`${dataKey}lastMsgTime`);
            let chtRplyMsgTxt = document.getElementById("rplySpn").innerText;

            let chatMsg = document.createElement("div");
            let chtMsgProf = document.createElement("div");
            let chtMsgdate = document.createElement("div");

            let chatMsgCon = document.createElement("div");
            let chtTxt = document.createElement("div");

            let chtReplyBtn = document.createElement("button");

            let chtusrOptH = document.createElement("div");
            let chtusrOptDiv = document.createElement("div");

            let usroptBtnCopy = document.createElement("button");
            let usroptBtnCopyIco = document.createElement("i");
            let usroptCopySpn = document.createElement("span");

            let usrOptBtnPin = document.createElement("button");
            let usrOptBtnPinIco = document.createElement("i");
            let usrOptPinSpn = document.createElement("span");

            let usroptBtnSave = document.createElement("button");
            let usroptBtnSaveIco = document.createElement("i");
            let usroptSaveSpn = document.createElement("span");

            let usrOptBtnReply = document.createElement("button");
            let usroptBtnReplyIco = document.createElement("i");
            let usroptReplySpn = document.createElement("span");

            let chtMainMsg = document.createElement("div");

            chatMsg.classList.add("chat-msg");

            chtReplyBtn.classList.add("reply_msg_btn");
            chtReplyBtn.classList.add("material-icons");

            chtMsgProf.classList.add("chat-msg-profile");
            chtMsgdate.classList.add("time");
            chatMsgCon.classList.add("chat-msg-content");

            chtusrOptH.classList.add("user_options_holder");
            chtusrOptDiv.classList.add("usr_opt_main_div");

            usroptBtnCopy.classList.add("usr_opts_btn");

            usrOptBtnPin.classList.add("usr_opts_btn");

            usroptBtnSave.classList.add("usr_opts_btn");

            usrOptBtnReply.classList.add("usr_opts_btn");

            chtTxt.classList.add("chat-msg-text");

            if(CheckPrevUser()) {
                chtTxt.classList.add("other-user");
                chatMsg.classList.add("other-old-msg");
            }

            chtMainMsg.classList.add("usr_main_msg");

            chtMainMsg.setAttribute(`id`, `${dbFetchId}`);

            if (dbFetchUser === getCookieDb) {
                chatMsg.classList.add("owner");

                let usrOptCls = document.getElementsByClassName("usr_opts_btn");
                let usrOptClsLen = usrOptCls.length;

                let msgOrininalVal;

                let chtMsgStatus = document.createElement("div");

                chtMsgStatus.classList.add("material-icons");
                chtMsgStatus.classList.add("delivered_status");

                let usroptBtnEdit = document.createElement("button");
                let usroptBtnEditIco = document.createElement("i");
                let usroptEditSpn = document.createElement("span");


                let usroptBtnDel = document.createElement("button");
                let usroptBtnDelIco = document.createElement("i");
                let usroptDelSpn = document.createElement("span");

                usroptBtnEdit.classList.add("usr_opts_btn");

                usroptBtnDel.classList.add("usr_opts_btn");
                usroptBtnDel.classList.add("red_btn");

                usroptEditSpn.innerText = "Edit";
                usroptDelSpn.innerText = "Delete";

                usroptBtnEditIco.innerHTML = `
                    <svg height="16" width="16" viewBox="0 0 24 24">
                        <path fill="#fff" d="M16.293 2.293l-13.5 13.5c-0.117 0.116-0.21 0.268-0.258 0.444l-1.5 5.5c-0.046 0.163-0.049 0.346 0 0.526 0.145 0.533 0.695 0.847 1.228 0.702l5.5-1.5c0.159-0.042 0.315-0.129 0.444-0.258l13.5-13.5c0.747-0.747 1.121-1.729 1.121-2.707s-0.374-1.96-1.121-2.707-1.729-1.121-2.707-1.121-1.96 0.374-2.707 1.121zM17.707 3.707c0.357-0.357 0.824-0.535 1.293-0.535s0.936 0.178 1.293 0.536 0.535 0.823 0.535 1.292-0.178 0.936-0.535 1.293l-13.312 13.312-3.556 0.97 0.97-3.555z"></path>
                    </svg>
                `;
                usroptBtnDelIco.innerHTML = `
                    <svg height="16" width="16" viewBox="0 0 24 24">
                        <path fill="#db4437" d="M18 7v13c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-10c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-13zM17 5v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v1h-4c-0.552 0-1 0.448-1 1s0.448 1 1 1h1v13c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h10c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-13h1c0.552 0 1-0.448 1-1s-0.448-1-1-1zM9 5v-1c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1z"></path>
                    </svg>
                `;

                chtMsgStatus.innerText = 'done_all';

                usroptBtnDel.appendChild(usroptBtnDelIco);
                usroptBtnDel.appendChild(usroptDelSpn);
                chtusrOptDiv.appendChild(usroptBtnDel);

                usroptBtnEdit.appendChild(usroptBtnEditIco);
                usroptBtnEdit.appendChild(usroptEditSpn);
                chtusrOptDiv.appendChild(usroptBtnEdit);

                chtMsgProf.appendChild(chtMsgStatus);

                usroptBtnEdit.addEventListener("click", function() {
                    chtMainMsg.setAttribute('contentEditable', 'true');
                    chtMainMsg.focus();

                    chatMsg.classList.add("focused");
                    chatMsg.classList.remove("selected_message");

                    if (dbFetchImage && !dbFetchMsg) chtMainMsg.style.display = 'inline-block';
                });

                usroptBtnDel.addEventListener("click", function() {
                    const rmvElemId = chtMainMsg.getAttribute("id");
                    const fetchingChat = dataBase.ref(`Collo Chat/Groups/${conversationId}/Group Chats`);

                    fetchingChat.child(`${rmvElemId}`).remove();
                });

                chtMainMsg.addEventListener("keydown", function(entAttr) {
                  if ((entAttr.key === 'Enter')&&(!entAttr.shiftKey)) {
                    entAttr.preventDefault();
                    const dataEditId = chtMainMsg.getAttribute("id");
                      let dataEditDb = fetchChat.child(`${dataEditId}`);
                      let inrTxt = chtMainMsg.innerText;

                      dataEditDb.update({Message: `${inrTxt}`}).then(function() {
                          chtMainMsg.removeAttribute("contentEditable");

                          chatMsg.classList.remove("focused");

                          if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal;
                      });
                  }
                });

                chtMainMsg.addEventListener("blur", function() {
                    if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal;

                    this.removeAttribute("contentEditable");
                    chatMsg.classList.remove("focused");
                });

            } else{
                chatMsg.classList.add("otherU");

                if(!CheckPrevUser()) {
                    const getColorDb = dataBase.ref(`Collo Chat/Users/Users Info/${dbFetchUser}/UserSettings`);
                    let chtMsgUsrName = document.createElement("div");

                    chtMsgUsrName.classList.add("chat-msg-user");

                    chtMsgUsrName.innerText = dbFetchUser;
                    chtTxt.appendChild(chtMsgUsrName);

                    getColorDb.once("value", function(getColor) {
                        let getColorTheme = getColor.val().ChatAccentColour;
                        chtMsgUsrName.style.color = `${getColorTheme}`;
                    });
                }

                if (dbFetchImage && !chtMainMsg.innerText) chtMainMsg.style.display = 'none';
            }
            function RepliedNow() {
                const getAccClr = getAccentClrDB(dbFetchUser);

                let clsReplyChtMsg = setTimeout(function() {
                    chatMsg.classList.remove("replyingCurr");
                    clearInterval(clsReplyChtMsg);
                }, 1000);

                chatMsg.classList.add("replyingCurr");

                rplyDomElemId.value = dbFetchId;

                if (dbFetchImage) {
                    const imageIcon = `<i class="material-icons">camera_alt</i> Image`;
                    ReplyMessageClass(chatMsg);
                    ReplyMessage(getAccClr, imageIcon, dbFetchUser, dbFetchImage);
                }
                if(validURL(dbFetchMsg)) {
                    const getClsLinkHold = chtMainMsg.getElementsByClassName("link_hold")[0];
                    const getClsLinkTxt = getClsLinkHold.getElementsByClassName("link_text")[0].innerText;
                    ReplyMessageClass(chatMsg);
                    ReplyMessage(getAccClr, getClsLinkTxt, dbFetchUser);
                }
                if(dbFetchAudio){
                    const audioIcon = `<i class="material-icons">volume_up</i> Audio`;
                    ReplyMessageClass(chatMsg);
                    ReplyMessage(getAccClr, audioIcon, dbFetchUser)

                }
                if(!dbFetchImage && !validURL(dbFetchMsg) && !dbFetchAudio) {
                    const chtMsgInnerTxtGet = chtMainMsg.innerText;
                    ReplyMessageClass(chatMsg);
                    ReplyMessage(getAccClr, chtMsgInnerTxtGet, dbFetchUser);
                }
                focusTextBox(true);
            }

            if (dbFetchRply) {
                const dbFetchRplyAccClr = dbFetch.ReplyAccentClr;

                let rplyDiv = document.createElement("div");
                let rplyLeftLine = document.createElement("div");
                let rplyDivUser = document.createElement("span");
                let rplyDivSpn = document.createElement("span");

                rplyDiv.classList.add("replied_message_div");

                rplyLeftLine.classList.add("reply_left_line");

                rplyDivUser.classList.add("replied_spans");
                rplyDivUser.classList.add("reply_from_user");

                rplyDivSpn.classList.add("replied_spans");
                rplyDivSpn.classList.add("replied_main_msg");

                rplyDivUser.style.color = `${dbFetchRplyAccClr}`;
                rplyLeftLine.style.backgroundColor = `${dbFetchRplyAccClr}`;

                if (dbFetchRplyImage) {
                    let rplyImageH = document.createElement("div");
                    let rplyImage = document.createElement("img");

                    rplyImageH.classList.add("replied_image_holder");
                    rplyImage.classList.add("replied_image");

                    rplyImage.src = dbFetchRplyImage;

                    rplyImageH.appendChild(rplyImage);
                    rplyDiv.appendChild(rplyImageH);
                }

                rplyDivUser.innerText = dbFetch.ReplyOfUser;

                rplyDivSpn.innerHTML = dbFetchRply;

                rplyDiv.addEventListener("click", function(rplyShw) {
                    rplyShw.preventDefault();
                    rplyShw.stopPropagation();

                    let scrollToDomId = document.getElementById(`${dbFetchScrollToId}`);

                    let scrollToDomIdParentElement;

                    if (dbFetchImage) scrollToDomIdParentElement = scrollToDomId.parentElement.parentElement;
                    else scrollToDomIdParentElement = scrollToDomId.parentElement.parentElement.parentElement;

                    scrollToDomIdParentElement.classList.add("scroll_in_view");

                    let scrollClsRemove = setTimeout(() => {
                        scrollToDomIdParentElement.classList.remove("scroll_in_view");
                    }, 1000);

                    scrollToDomId.scrollIntoView({block: "center"});
                });

                rplyDiv.appendChild(rplyLeftLine);
                rplyDiv.appendChild(rplyDivUser);
                rplyDiv.appendChild(rplyDivSpn);
                chtTxt.appendChild(rplyDiv);
            }

            if (dbFetchImage) {
                const dominentImgClrDb = dbFetch.ImageDominentClr;

                let imgHolder = document.createElement("div");
                let imgMainClr = document.createElement("div");
                let imgTag = document.createElement("img");

                imgHolder.classList.add("cht_img_holder");
                imgMainClr.classList.add("image_tag_button");

                chtTxt.classList.add("is_img");

                chtTxt.setAttribute("id", `${dbFetchId}`);

                imgTag.setAttribute("src", dbFetchImage);

                imgHolder.style.height = `${dbFetchImageHeight}`;
                imgHolder.style.width = `${dbFetchImageWidth}`;

                imgHolder.style.backgroundColor = dominentImgClrDb;
                imgMainClr.style.backgroundColor = dominentImgClrDb;

                imgTag.addEventListener("load", function() {
                    imgHolder.style.backgroundColor = 'transparent';
                    imgHolder.style.height = 'fit-content';
                });

                imgHolder.appendChild(imgTag);
                imgHolder.appendChild(imgMainClr);
                chtTxt.appendChild(imgHolder);

                if (dbFetchMsg) {
                    let imgCaption = document.createElement("div");

                    imgCaption.classList.add("text_caption");

                    imgCaption.innerText = dbFetchMsg;

                    imgHolder.appendChild(imgCaption);
                } else chtMainMsg.style.display = 'none';

            }

            if(dbFetchAudio) {

                let mainAudioURL = new Audio(`${dbFetchAudio}`);

                let isplay = false;

                let convertTime = function(num) {
                    let seconds = parseInt(num);
                    let minutes = parseInt(seconds / 60);

                    seconds = seconds - (minutes * 60);

                    const hours = parseInt(minutes / 60);
                    minutes = minutes - (hours * 60);

                    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;

                    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds%60).padStart(2, 0)}`;
                }

                chtTxt.classList.add("is_audio");

                const playSvgIcon = `M5.541 2.159c-0.153-0.1-0.34-0.159-0.541-0.159-0.552 0-1 0.448-1 1v18c-0.001 0.182 0.050 0.372 0.159 0.541 0.299 0.465 0.917 0.599 1.382 0.3l14-9c0.114-0.072 0.219-0.174 0.3-0.3 0.299-0.465 0.164-1.083-0.3-1.382zM6 4.832l11.151 7.168-11.151 7.168z`;

                const pauseSvgIcon = `M6 3c-0.552 0-1 0.448-1 1v16c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-16c0-0.552-0.448-1-1-1zM7 5h2v14h-2zM14 3c-0.552 0-1 0.448-1 1v16c0 0.552 0.448 1 1 1h4c0.552 0 1-0.448 1-1v-16c0-0.552-0.448-1-1-1zM15 5h2v14h-2z`;

                if(!dbFetchMsg) chtMainMsg.style.display = 'none';

                let audioHolder = document.createElement("div");
                let audioInlineImage = document.createElement("div");
                let audioImageHolder = document.createElement("div");
                let audioImageUser = document.createElement("img");
                let audioSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                let audioSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                let audioPlayInline = document.createElement("div");

                let mainAudioPlayer = document.createElement("div");

                let mainSvgAudioInlines = document.createElement("div");
                let playPauseSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                let playPauseSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                let mainCurrentTimeInlines = document.createElement("div");
                let currentTimeSpan = document.createElement("span");

                let mainAudioSeekInlines = document.createElement("div");
                let audioSeekHolder = document.createElement("div");
                let mainAudioSeek = document.createElement("div");

                let mainDurationTimeInlines = document.createElement("div");
                let durationTimeSpan = document.createElement("span");

                audioSvg.appendChild(audioSvgPath);
                audioImageHolder.appendChild(audioImageUser);
                audioImageHolder.appendChild(audioSvg);
                audioInlineImage.appendChild(audioImageHolder);

                playPauseSvg.appendChild(playPauseSvgPath);
                mainSvgAudioInlines.appendChild(playPauseSvg);

                mainCurrentTimeInlines.appendChild(currentTimeSpan);

                audioSeekHolder.appendChild(mainAudioSeek);
                mainAudioSeekInlines.appendChild(audioSeekHolder);

                mainDurationTimeInlines.appendChild(durationTimeSpan);

                mainAudioPlayer.appendChild(mainSvgAudioInlines);
                mainAudioPlayer.appendChild(mainCurrentTimeInlines);
                mainAudioPlayer.appendChild(mainAudioSeekInlines);
                mainAudioPlayer.appendChild(mainDurationTimeInlines);

                audioPlayInline.appendChild(mainAudioPlayer);

                audioHolder.appendChild(audioInlineImage);
                audioHolder.appendChild(audioPlayInline);

                chtTxt.appendChild(audioHolder);

                audioHolder.classList.add("audio-recording-holder");
                audioInlineImage.classList.add("audio_recorded_inline");
                audioImageHolder.classList.add("audio-from-userimage-holder");
                playPauseSvg.classList.add('audio-play-pause-svg');

                audioPlayInline.classList.add("audio_recorded_inline");
                mainAudioPlayer.classList.add("audio-main-player");

                mainSvgAudioInlines.classList.add("main-audio-inlines");

                mainCurrentTimeInlines.classList.add("main-audio-inlines");
                currentTimeSpan.classList.add("audio-time-spans");

                mainAudioSeekInlines.classList.add("main-audio-inlines");
                audioSeekHolder.classList.add("seek-line-holder");
                mainAudioSeek.classList.add("seek-line");

                mainDurationTimeInlines.classList.add("main-audio-inlines");
                durationTimeSpan.classList.add("audio-time-spans");

                audioSvg.setAttribute('viewBox', '0 0 24 24');
                audioSvg.setAttribute('height', '20');
                audioSvg.setAttribute('width', '20');
                audioSvg.classList.add("audio-icon");

                dataBase.ref(`Collo Chat/Users/Users Info/${dbFetchUser}/UserDetails/UserProfileImage`).on("value", function(getImg) {
                    const getImgForAudio = getImg.val();

                    console.log(getImgForAudio);

                    audioImageUser.setAttribute("src", `${getImgForAudio}`);
                });

                audioSvgPath.setAttribute("d", `M20 19c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-3c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h2v3zM4 19v-4h2c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v3c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM2 19c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-3c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-2v-1c0-2.209 0.894-4.208 2.343-5.657s3.448-2.343 5.657-2.343 4.208 0.894 5.657 2.343 2.343 3.448 2.343 5.657v1h-2c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v3c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-7c0-2.761-1.12-5.263-2.929-7.071s-4.31-2.929-7.071-2.929-5.263 1.12-7.071 2.929-2.929 4.31-2.929 7.071v6z`);

                playPauseSvg.setAttribute('viewBox', '0 0 24 24');
                playPauseSvg.setAttribute('height', '25');
                playPauseSvg.setAttribute('width', '25');

                playPauseSvgPath.setAttribute("d", `${playSvgIcon}`);

                let audioPlaying;

                let toogleAudioState = function() {
                    isplay ? mainAudioURL.pause():mainAudioURL.play();

                    if (!isplay) {
                        mainAudioURL.play();

                        playPauseSvgPath.setAttribute("d", `${pauseSvgIcon}`);

                        audioPlaying = setInterval(() => {
                            mainAudioSeek.style.width = ((mainAudioURL.currentTime / mainAudioURL.duration) * 100) + "%";
                            currentTimeSpan.innerText = convertTime(mainAudioURL.currentTime);
                        }, 500);

                    } else{
                        mainAudioURL.pause();
                        clearInterval(audioPlaying);
                        playPauseSvgPath.setAttribute("d", `${playSvgIcon}`);
                    }
                }

                mainAudioURL.addEventListener("loadedmetadata", function() {

                    if (mainAudioURL.duration === Infinity) {

                        mainAudioURL.currentTime = 1e101;

                        mainAudioURL.ontimeupdate = function() {
                            this.ontimeupdate = () => {return;}

                            durationTimeSpan.innerText = convertTime(mainAudioURL.duration);

                            mainAudioURL.currentTime = 0;
                        }
                    }
                    currentTimeSpan.innerText = `0:00`;
                });

                mainAudioURL.addEventListener("playing", ()=> isplay = true);
                mainAudioURL.addEventListener("pause", ()=> isplay = false);

                mainAudioURL.addEventListener("ended", function () {
                    currentTimeSpan.innerText = '0:00';
                    mainAudioURL.currentTime = 0;
                    playPauseSvgPath.setAttribute("d", `${playSvgIcon}`);
                });

                mainSvgAudioInlines.addEventListener("click", function(evt) {
                    evt.stopPropagation();
                    toogleAudioState();
                });

                audioSeekHolder.addEventListener("click", function(seekEvt) {
                    seekEvt.stopImmediatePropagation();

                    const timelineWidth = window.getComputedStyle(audioSeekHolder).width;
                    const timeToSeek = Math.round(seekEvt.offsetX / parseInt(timelineWidth) * mainAudioURL.duration);

                    mainAudioURL.currentTime = timeToSeek;
                });

            }

            if(validURL(dbFetchMsg)) {
                let linkHold = document.createElement("div");
                let linkAnchor = document.createElement("div");

                linkHold.classList.add("link_hold");

                   if(!dbFetch.ImageUrl){
                        let data = {key: '1ab256542fce49dbedd2428c6e066973', q: dbFetchMsg};

                        chtTxt.classList.add("is_Link");

                        let linkUpperH = document.createElement("div");
                        let linkInlineDiv = document.createElement("div");
                        let linkFrame = document.createElement("img");
                        let linkText = document.createElement("div");

                        linkUpperH.classList.add("link_upper_hold");
                        linkAnchor.classList.add("link_text")
                        linkInlineDiv.classList.add("link_divs");

                        linkText.classList.add("link_divs");
                        linkText.classList.add("text_link_div");

                        fetch('https://api.linkpreview.net', {
                            method: 'POST',
                            mode: 'cors',
                            body: JSON.stringify(data),
                        }).then(res => res.json()).then(response => {
                            linkText.innerHTML = response.description;
                            if(response.image){
                                linkFrame.setAttribute("loading", "lazy");
                                linkFrame.src = response.image;
                            }
                            linkAnchor.innerText = response.url;
                        });

                        linkUpperH.appendChild(linkInlineDiv);
                        linkInlineDiv.appendChild(linkFrame);

                        linkHold.appendChild(linkUpperH);
                        linkUpperH.appendChild(linkText);
                   }


                    linkHold.appendChild(linkAnchor);
                    chtMainMsg.appendChild(linkHold);

                    chtReplyBtn.addEventListener("click", function() {
                        const linkAnchText = linkAnchor.innerText;

                        rplyDomElemId.value = dbFetchId;

                        ReplyMessage("#1a8cff", linkAnchText, dbFetchUser);
                    });
            } else{
                chtMainMsg.innerHTML = dbFetchMsg;

                chtReplyBtn.addEventListener("click", function(rplyEvt) {
                    rplyEvt.preventDefault();
                    rplyEvt.stopPropagation();
                    RepliedNow();
                });
            }

            chtReplyBtn.innerText = 'reply';

            usroptBtnCopyIco.innerHTML = `
                <svg height="16" width="16" viewBox="0 0 24 24">
                    <path fill="#fff" d="M11 8c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v9c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h9c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-9c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879zM11 10h9c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v9c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-9c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-9c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293zM5 14h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-9c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h9c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v1c0 0.552 0.448 1 1 1s1-0.448 1-1v-1c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-9c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v9c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.552 0 1-0.448 1-1s-0.448-1-1-1z"></path>
                </svg>
            `;

            usrOptBtnPinIco.innerHTML = `<svg height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M21.436 7.586l-3.998-4.020c-0.752-0.756-2.063-0.764-2.83-0.006-0.196 0.196-0.35 0.436-0.418 0.629-0.653 1.362-1.354 2.215-2.254 2.727l-0.217 0.105c-0.968 0.485-2.285 0.979-4.719 0.979-0.266 0-0.521 0.052-0.766 0.152-0.484 0.202-0.879 0.595-1.082 1.084-0.199 0.484-0.199 1.041 0 1.525 0.104 0.249 0.25 0.471 0.435 0.651l3.235 3.235-3.822 5.353 5.352-3.822 3.227 3.227c0.186 0.189 0.406 0.339 0.656 0.441 0.247 0.103 0.503 0.154 0.766 0.154s0.519-0.052 0.765-0.154c0.498-0.205 0.883-0.592 1.080-1.078 0.103-0.242 0.155-0.507 0.155-0.768 0-2.436 0.494-3.752 0.978-4.721 0.496-0.992 1.369-1.748 2.754-2.414 0.271-0.104 0.51-0.256 0.711-0.457 0.772-0.782 0.768-2.051-0.008-2.822zM16.188 12.387c-0.819 1.643-1.188 3.37-1.195 5.604l-7.993-7.991c2.139 0 3.814-0.335 5.396-1.084l0.235-0.105c1.399-0.699 2.468-1.893 3.388-3.834l3.924 4.051c-1.863 0.893-3.056 1.96-3.755 3.359z"></path></svg>`;

            usroptBtnSaveIco.innerHTML = `<svg height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M18.419 21.814c0.161 0.116 0.363 0.186 0.581 0.186 0.552 0 1-0.448 1-1v-16c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-10c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v16c-0.001 0.199 0.060 0.404 0.186 0.581 0.321 0.449 0.946 0.554 1.395 0.232l6.419-4.584zM18 19.057l-5.419-3.871c-0.355-0.254-0.819-0.242-1.162 0l-5.419 3.871v-14.057c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h10c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707z"></path></svg>`;

            usroptBtnReplyIco.innerHTML = `<svg height="16" width="16" viewBox="0 0 18 18"><path fill="#fff" d="M10.996 7.001l-3.979 0.002c-0.006 0-0.012-0.002-0.019-0.002h-1.604l3.317-3.319c0.382-0.382 0.382-1 0-1.382l-0.014-0.014c-0.381-0.381-1-0.381-1.381 0l-4.915 4.918c-0.035 0.026-0.070 0.051-0.101 0.083l-0.005 0.005c-0.001 0.001-0.002 0.002-0.003 0.004l-0.005 0.005c-0.034 0.034-0.061 0.071-0.088 0.109-0.009 0.011-0.020 0.021-0.027 0.033-0.114 0.167-0.171 0.36-0.17 0.554 0 0.002-0 0.003-0 0.005s0 0.003 0 0.004c-0.001 0.194 0.056 0.387 0.17 0.554 0.008 0.012 0.018 0.021 0.026 0.033 0.028 0.037 0.056 0.075 0.089 0.109l0.005 0.005c0.001 0.001 0.002 0.002 0.003 0.003l0.005 0.005c0.031 0.032 0.066 0.057 0.101 0.083l4.915 4.918c0.381 0.381 1 0.381 1.381 0l0.014-0.014c0.382-0.381 0.382-1 0-1.382l-3.317-3.319h1.604c0.007 0 0.013-0.002 0.019-0.002v0.002h3.979c1.654 0 2.999 1.346 2.999 3.001v2.998c0 0.553 0.448 1 1 1s1-0.448 1-1v-2.998c0-2.762-2.237-5.001-4.998-5.001z"></path></svg>`;

            usroptCopySpn.innerText = "Copy";
            usrOptPinSpn.innerText = "Pin";
            usroptSaveSpn.innerText = "Save";
            usroptReplySpn.innerText = "Reply";

            chtMsgdate.innerText = dbFetchTime;

            chtMsgProf.appendChild(chtMsgdate);

            usroptBtnCopy.appendChild(usroptBtnCopyIco);
            usroptBtnCopy.appendChild(usroptCopySpn);

            usrOptBtnPin.appendChild(usrOptBtnPinIco);
            usrOptBtnPin.appendChild(usrOptPinSpn);

            usroptBtnSave.appendChild(usroptBtnSaveIco);
            usroptBtnSave.appendChild(usroptSaveSpn);

            usrOptBtnReply.appendChild(usroptBtnReplyIco);
            usrOptBtnReply.appendChild(usroptReplySpn);

            chtusrOptDiv.appendChild(usrOptBtnPin);
            chtusrOptDiv.appendChild(usroptBtnCopy);
            chtusrOptDiv.appendChild(usroptBtnSave);
            chtusrOptDiv.appendChild(usrOptBtnReply);

            chtusrOptH.appendChild(chtusrOptDiv);
            chtTxt.appendChild(chtusrOptH);

            chtTxt.appendChild(chtReplyBtn);

            if(!dbFetchImage) chtTxt.appendChild(chtMainMsg);

            chatMsgCon.appendChild(chtTxt);

            chatMsg.appendChild(chatMsgCon);
            chtTxt.appendChild(chtMsgProf);

            chtAreaMsg.appendChild(chatMsg);

            usrOptBtnReply.addEventListener("click", RepliedNow);

            usroptBtnCopy.addEventListener("click", function() {
                navigator.clipboard.writeText(chtMainMsg.innerText);
                InChatActionsNotif({
                    Icon: `<svg height="50" width="50" viewBox="0 0 24 24"><path fill="#fff" d="M18.984 21v-14.016h-10.969v14.016h10.969zM18.984 5.016q0.797 0 1.406 0.586t0.609 1.383v14.016q0 0.797-0.609 1.406t-1.406 0.609h-10.969q-0.797 0-1.406-0.609t-0.609-1.406v-14.016q0-0.797 0.609-1.383t1.406-0.586h10.969zM15.984 0.984v2.016h-12v14.016h-1.969v-14.016q0-0.797 0.586-1.406t1.383-0.609h12z"></path></svg>`,
                    Text: "Copied!"
                });
            });

            usrOptBtnPin.addEventListener("click", function() {
                const pinMsgId = Date.now();

                const pinMessageDbChild = pinMessageDb.child(`${pinMsgId}`);

                const pinSuccessCallback = function(msgType) {
                    const pinInfo = `${usernameCookie} has Pinned ${msgType} in Group`;
                    const fetchChatContent = fetchChat.child(`${pinMsgId}Info`);

                    const pinInfoObj = {
                        contentInfo: pinInfo
                    };

                    fetchChatContent.set(pinInfoObj).then(()=>{

                    InChatActionsNotif({
                            Icon: `<svg width="50" height="50" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M16.729 4.271c-0.389-0.391-1.021-0.393-1.414-0.004-0.104 0.104-0.176 0.227-0.225 0.355-0.832 1.736-1.748 2.715-2.904 3.293-1.297 0.64-2.786 1.085-5.186 1.085-0.13 0-0.26 0.025-0.382 0.076-0.245 0.102-0.439 0.297-0.541 0.541-0.101 0.244-0.101 0.52 0 0.764 0.051 0.123 0.124 0.234 0.217 0.326l3.243 3.243-4.537 6.050 6.050-4.537 3.242 3.242c0.092 0.094 0.203 0.166 0.326 0.217 0.122 0.051 0.252 0.078 0.382 0.078s0.26-0.027 0.382-0.078c0.245-0.102 0.44-0.295 0.541-0.541 0.051-0.121 0.077-0.252 0.077-0.381 0-2.4 0.444-3.889 1.083-5.166 0.577-1.156 1.556-2.072 3.293-2.904 0.129-0.049 0.251-0.121 0.354-0.225 0.389-0.393 0.387-1.025-0.004-1.414l-3.997-4.020z"></path>
                                </svg>`,
                            Text: "Message Pinned!"
                        });
                    });
                };

                const defaultPinObject = {
                    PinMessage: dbFetchMsg,
                    PinByUser: dbFetchUser
                };

                if(dbFetchImage) {
                    const pinImageObj = Object.assign({PinImageUrl: dbFetchImage}, defaultPinObject);
                    pinMessageDbChild.set(pinImageObj).then(()=>pinSuccessCallback('Image'));
                } else pinMessageDbChild.set(defaultPinObject).then(()=>pinSuccessCallback('Text'));
            });

            usroptBtnSave.addEventListener("click", function() {
                const msgUniqId = generateUniqueId();

                const saveMsgDbPathChild = saveMsgGrp.child(`${msgUniqId}`);

                const saveMsgOutline = `<svg height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M18.419 21.814c0.161 0.116 0.363 0.186 0.581 0.186 0.552 0 1-0.448 1-1v-16c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-10c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v16c-0.001 0.199 0.060 0.404 0.186 0.581 0.321 0.449 0.946 0.554 1.395 0.232l6.419-4.584zM18 19.057l-5.419-3.871c-0.355-0.254-0.819-0.242-1.162 0l-5.419 3.871v-14.057c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h10c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707z"></path></svg>`;
                const saveMsgFilled = `<svg height="16" width="16" viewBox="0 0 20 28"><path fill="#fff" d="M18.188 2c0.234 0 0.469 0.047 0.688 0.141 0.688 0.266 1.125 0.906 1.125 1.609v20.141c0 0.703-0.438 1.344-1.125 1.609-0.219 0.094-0.453 0.125-0.688 0.125-0.484 0-0.938-0.172-1.297-0.5l-6.891-6.625-6.891 6.625c-0.359 0.328-0.812 0.516-1.297 0.516-0.234 0-0.469-0.047-0.688-0.141-0.688-0.266-1.125-0.906-1.125-1.609v-20.141c0-0.703 0.438-1.344 1.125-1.609 0.219-0.094 0.453-0.141 0.688-0.141h16.375z"></path></svg>`;

                const defaultSaveMsgObject = {
                    fromUser: dbFetchUser,
                    savedMsg: dbFetchMsg,
                    savedUsrTime: dbFetchTime,
                    lastUpdate: `${msgUniqId}`
                };

                if (usroptBtnSaveIco.innerHTML === saveMsgOutline) {

                    if (dbFetchImage) {
                        const imageUrlObject = {savedImgUrl: dbFetchImage}
                        const assignedSaveImgObj = Object.assign({}, defaultSaveMsgObject, imageUrlObject);

                        saveMsgDbPathChild.set(assignedSaveImgObj);
                    }
                    if(dbFetchRply) {
                        const replyObject = {savedRplyStr: dbFetchRply};
                        const assignedReplyObj = Object.assign({}, replyObject, defaultSaveMsgObject);

                        saveMsgDbPathChild.set(assignedReplyObj);
                    }

                    if(!dbFetchImage && !dbFetchRply) {
                        saveMsgDbPathChild.set(defaultSaveMsgObject);
                    }

                } else{
                    usroptBtnSaveIco.innerHTML = saveMsgFilled;
                    showSnackNotification({icon: 'star_outline', notifAbout: 'Bubble Unstarred!'});
                }
            });

            if (dbFetchMsg) lstMsg.innerHTML = dbFetchMsg;
            else if(dbFetchImage) lstMsg.innerHTML = `<i class="material-icons">camera_alt</i> Image`;
            else if(dbFetchAudio) lstMsg.innerHTML = `<i class="material-icons">volume_up</i> Audio`;

            lstMsgtime.innerText = dbFetchTime;

            dataBase.ref(`Collo Chat/Groups/${dataKey}`).update({
                LastActivity: {
                    LastMessage: lstMsg.innerHTML,
                    LastMessageTime: dbFetchTime
                }
            });
            chatMsg.classList.add("appear");

            chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;
        }  else {

            let dbFetchContentInfo = dbFetch.contentInfo;

            let chtMsgForContent = document.createElement("div");

            let contentHold = document.createElement("div");

            contentHold.classList.add("content_info_holder");
            chtMsgForContent.classList.add("chat-msg");

            contentHold.innerText = dbFetchContentInfo;

            chtMsgForContent.appendChild(contentHold);
            chtAreaMsg.appendChild(chtMsgForContent);
            chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;

            // setTimeout(()=>{
                chtMsgForContent.classList.add("appear");
            // }, 250);
        }
        addSelectClass();
    };

    fetchChat.on("child_added", onvaluefn);

    const saveMsgGrp = dataBase.ref(`Collo Chat/Groups/${conversationId}/Saved Messages/${usernameCookie}`);

    saveMsgGrp.on('child_added', function(dbGrpsavedMsg) {

        const savedMsgVal = dbGrpsavedMsg.val();

        let saveMsgH = document.getElementById("savedMsgHold");

        let saveMsgDivH = document.createElement("div");
        let saveMsgDiv = document.createElement("div");
        let fromUserSpn = document.createElement("div");
        let saveMsgSpn = document.createElement("div");
        let savedMsgTime = document.createElement("div");
        let saveMsgInd = document.createElement("button");

        saveMsgDivH.classList.add("saved_msgs_cntr");
        saveMsgDiv.classList.add("saved_msgs");
        fromUserSpn.classList.add("from_user");
        saveMsgSpn.classList.add("saved_msgs_spn");
        savedMsgTime.classList.add("saved_msgs_usr_time");
        saveMsgInd.classList.add("material-icons");
        saveMsgInd.classList.add("saved_msgs_indcatr");

        if (savedMsgVal.fromUser === usernameCookie) {
            fromUserSpn.innerText = 'Me';
            saveMsgDivH.classList.add("saved_msgs_me");
        }
        else {
            fromUserSpn.innerText = savedMsgVal.fromUser;
            saveMsgDivH.classList.add("saved_msgs_others");
        }

        if (savedMsgVal.savedRplyStr) {
            let saveMsgRply = document.createElement("div");
            let saveMsgLine = document.createElement("div");
            let saveMsgUser = document.createElement("span");
            let saveMsgSpn = document.createElement("span");

            saveMsgRply.classList.add("saved_msgs_reply");
            saveMsgLine.classList.add("saved_rply_msg_line");
            saveMsgSpn.classList.add("save_msg_main_rply");

            saveMsgSpn.innerText = savedMsgVal.savedRplyStr;

            saveMsgRply.appendChild(saveMsgLine);
            saveMsgRply.appendChild(saveMsgSpn);
            saveMsgDiv.appendChild(saveMsgRply);
        }

        if (savedMsgVal.savedImgUrl) {
            let saveMsgImg = document.createElement("img");
            saveMsgImg.classList.add("saved_msg_img");
            saveMsgImg.setAttribute("loading", "lazy");
            saveMsgImg.setAttribute("src", savedMsgVal.savedImgUrl);
            saveMsgDiv.appendChild(saveMsgImg);
        }

        saveMsgSpn.innerHTML = savedMsgVal.savedMsg;
        savedMsgTime.innerText = savedMsgVal.savedUsrTime;
        saveMsgInd.innerText = 'bookmark';

        saveMsgInd.addEventListener("click", function() {
            saveMsgGrp.child(`${savedMsgVal.lastUpdate}`).remove().then(function() {
                showSnackNotification({icon: 'bookmark_outline', notifAbout: 'Bubble Unstarred!'});
            });
        });

        saveMsgDivH.setAttribute("id", `${savedMsgVal.lastUpdate}`);

        saveMsgDiv.appendChild(saveMsgSpn);
        saveMsgDivH.appendChild(savedMsgTime);
        saveMsgDivH.appendChild(saveMsgInd);
        saveMsgDivH.appendChild(fromUserSpn);
        saveMsgDivH.appendChild(saveMsgDiv);

        saveMsgH.appendChild(saveMsgDivH);

        saveMsgH.scrollTop = saveMsgH.scrollHeight;
    });

    saveMsgGrp.on('child_removed', function(rmvSMsgSnp) {
        const rmvSnpVal = rmvSMsgSnp.val();
        const lstUpdateMsg = rmvSnpVal.lastUpdate;
        let rmvMsgId = document.getElementById(`${lstUpdateMsg}`);
        rmvMsgId.remove();
    });

    const pinMessageDb = dataBase.ref(`Collo Chat/Groups/${conversationId}/Pinned Messages`);

    pinMessageDb.on("child_added", function(pinMsgSnp) {
        let pinMsgSnpVal = pinMsgSnp.val();

        const pinMsg = pinMsgSnpVal.PinMessage;
        const pinUserName = pinMsgSnpVal.PinByUser;
        const pinUserImg = pinMsgSnpVal.PinUserImg;
        const pinUserBgImg = pinMsgSnpVal.PinUserBgImg;

        let mainPinDiv = document.getElementById("pinMsgSlideDiv");
        let allSlides = document.getElementsByClassName("pin_message_slides");
        let lstPinMsg = document.getElementById("pinnedLastMsg");

        let allSlidesLen = allSlides.length;

        let pinSlideDef = 1;

        let pinSlide = document.createElement("div");
        let pinnedMsg = document.createElement("div");

        let pinnedMsgFromUser = document.createElement("div");
        let pinnedUserName = document.createElement("span");

        pinSlide.classList.add("pin_message_slides");
        pinnedMsg.classList.add("pinned_msg");
        pinnedMsgFromUser.classList.add("pinned_msg_from_user");

        if (pinMsgSnpVal.PinImageUrl) {
            let pinImage = document.createElement("img");
            pinImage.classList.add("pinned_image");

            pinImage.src = pinMsgSnpVal.PinImageUrl;

            pinSlide.appendChild(pinImage);
        }

        pinnedMsg.innerHTML = pinMsg;
        pinnedUserName.innerText = pinUserName;
        lstPinMsg.innerHTML = pinMsg;

        pinSlide.style.backgroundImage = `url("${pinUserBgImg}")`;

        pinSlide.appendChild(pinnedMsg);
        pinnedMsgFromUser.appendChild(pinnedUserName);
        pinSlide.appendChild(pinnedMsgFromUser);
        mainPinDiv.appendChild(pinSlide);

        PreviewSlides(allSlidesLen - 1);

        function adjacentSlide(plsValue) {
          PreviewSlides(pinSlideDef += plsValue);
        }

        function PreviewSlides(plsValue) {

          let slides = document.getElementsByClassName("pin_message_slides");
          let slidesLen = slides.length;

              if (plsValue > slidesLen) pinSlideDef = 1;
            if (plsValue < 1) pinSlideDef = slidesLen;

            for (let i = 0; i < slidesLen; ++i) slides[i].style.display = "none";

            slides[pinSlideDef-1].style.display = "inline-block";
        }
        let nextSlideButtons = document.getElementById("nextSlideBtn");
        let prevSlideButtons = document.getElementById("PrevSlideBtn");

        nextSlideButtons.addEventListener("click", function() {
            adjacentSlide(1);
        });
        prevSlideButtons.addEventListener("click", function() {
            adjacentSlide(-1);
        });

    });

    const mainDb = dataBase.ref("Collo Chat");
    const grpDb = dataBase.ref(`Collo Chat/Groups/${conversationId}/Group Info`);

    function editFuntion() {
        grpDescInpt.contentEditable = "true";
        grpEditBtn.innerText = `done`;
        grpEditBtn.removeEventListener("click", editFuntion);
        grpEditBtn.addEventListener("click", saveFuntion);
    }

    function saveFuntion() {
        grpDescInpt.contentEditable = "false";
        const grpDesc = grpDescInpt.innerText;

        grpDb.update({
            GroupDesc: grpDesc
        }).then(() => {
            let uniqueConId = Date.now();
            let changerInfo = `${usernameCookie} Updated Group Description`;
            fetchChat.child(`${uniqueConId}_contentInfo`).set({
                contentInfo: changerInfo
            });
        });

        grpEditBtn.innerText = `edit`;
        grpEditBtn.addEventListener("click", editFuntion);
        grpEditBtn.removeEventListener("click", saveFuntion);
    }

    grpEditBtn.addEventListener("click", editFuntion);

    function saveMsgPanel() {
        let saveMsgMdl = document.getElementById("saveMsgModal");
        saveMsgMdl.classList.toggle("show_saved_msg");
    }

    saveMsgBtn.addEventListener("click", saveMsgPanel);
    saveMsgCls.addEventListener("click", saveMsgPanel);

    grpFileReader.addEventListener("change", function(grpPicChg) {
        const grpPic = cldStorage.ref(`${conversationId}/Profile_pic`);

        let grpCamIcon = document.getElementById("grpImgCameraIcon");

        let grpPrfImgLoad = document.getElementById("grpPrfImage");
        let grpPrfImgCir = document.getElementById("grpPrfImageCircleLoad");
        let grpPrfImgCirPath = document.getElementById("grpPrfImageLoadPath");

        let grpPrfLoadNums = document.getElementById("grpPrfImgLoadNums");

        const grpFile = grpPicChg.target.files[0];

        const grpImgBlob = URL.createObjectURL(grpFile);

        const grpPrfImg = grpPic.put(grpFile, {contentType: grpFile.type});

        grpProfilePic.src = grpImgBlob;
        grpCamIcon.innerText = '';
        grpEditOverlay.classList.add("stay_overlayed");
        ImageLoaderState(grpPrfImgLoad, grpPrfImgCir, grpPrfImgCirPath, true);

        grpPrfImg.on("state_changed", function(grpImgSnp) {
            const grpImageBytesTrans = grpImgSnp.bytesTransferred;
            const grpImageTotalBytes = grpImgSnp.totalBytes;

            grpPrfLoadNums.innerText = `${Math.round((grpImageBytesTrans/grpImageTotalBytes)*100)}%`;
        });

        grpPrfImg.then(function(grpImgSnp) {
            grpImgSnp.ref.getDownloadURL().then((url) => {
                grpDb.update({GroupImg: url}).then(() => {
                    const uniquegrpImgId = Date.now();
                    const imgChangerInfo = `${usernameCookie} has Updated Group Profile Pic`;
                    const fetchChatContent = dataBase.ref(`Collo Chat/Groups/${conversationId}/Group Chats`);
                    fetchChatContent.child(`${uniquegrpImgId}_contentInfo`).set({
                        contentInfo: imgChangerInfo
                    });
                    ImageLoaderState(grpPrfImgLoad, grpPrfImgCir, grpPrfImgCirPath, false);
                    grpCamIcon.innerText = 'camera_alt';
                    grpEditOverlay.classList.remove("stay_overlayed");
                });
            });
        });
    });

}
(function() {
    const grpDbMain = dataBase.ref(`Collo Chat/Groups`);

    grpDbMain.on("value", function (grpInfo) {
        const getGrpInfo = grpInfo.val();

        let grpNameArray = Object.keys(getGrpInfo);

        grpNameArray.forEach((names) => {
            let getImagesById = document.getElementById(`${names}PrfImg`);

            getImagesById.src = grpInfo.child(`${names}/Group Info/GroupImg`).val();

            const lastMsg = grpInfo.child(`${names}/LastActivity`);

            const readLstMsg = lastMsg.val()?.LastMessage;
            const readLstMsgTime = lastMsg.val()?.LastMessageTime;

            let getLastMsgId = document.getElementById(`${names}lastMsg`);
            let getLastMsgTimeId = document.getElementById(`${names}lastMsgTime`);

            getLastMsgId.innerHTML = readLstMsg;
            getLastMsgTimeId.innerHTML = readLstMsgTime;
        });
    });
})();
