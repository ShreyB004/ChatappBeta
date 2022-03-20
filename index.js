//Firebase Setting Up

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

//Firebase Database and cloud storage 

const dataBase = firebase.database();
const cldStorage = firebase.storage();

/* const messaging = firebase.messaging();*/

//All declaratoins => Local Scope
let loadDiv = document.getElementById("loadingHold");
let loadingBar = document.getElementById("appLoading");
let loadingCir = document.getElementById("loadCircle");
let loadingDot = document.getElementById("loadDot"); 

let chtarea = document.getElementById("chatArea");
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

let sendBtn = document.getElementById("sendMsg");
let audioBtn = document.getElementById("record"); 
let stopBtn = document.getElementById("stopRecording");

let msgInpt = document.getElementById("message");
let replyClr = document.getElementById("rplyClr");
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

let clsImgMdl = document.getElementById("clsMdl");
let imgchtAttach = document.getElementById("attachment");

let rplSpn = document.getElementById("rplySpn");
let rplyDbFromUsr = document.getElementById("rplyFrmUsr");

let userBioPrevw = document.getElementById("showUserBio");
let userNamePrevw = document.getElementById("showUserName");

let wrapper = document.getElementById("onlineState");
let offlineDiv = document.getElementById("offlineDiv")

let imgUsrName = document.getElementById("imageUserName");
let cUsrState = document.getElementById("currUsrState");

loadingCir.addEventListener("animationend", function() {
	loadDot.classList.add("loaded_dot");
});
loadingBar.addEventListener("animationend", function() {
	wrapper.classList.add("appLoaded");
	loadingHold.remove();
});

function blurAllInputs() {
	let allDomInputs = document.querySelectorAll(`input[type="text"]`);
	allDomInputs.forEach((input) => {
		if (input.focus()) input.blur();
	});
}

let onlineState = setInterval(function() {
	if (!navigator.onLine) {
		wrapper.classList.add("offline_page");
		offlineDiv.classList.add("isOffline");
		blurAllInputs();
		showSnackNotification({icon: 'wifi', notifAbout: 'Reconnecting...', isWarning: true});
	} else{
		wrapper.classList.remove("offline_page");
		offlineDiv.classList.remove("isOffline");
	}
}, 2500);

//For Getting Username

let usernameCookie = '';

//Setting a Cookie

function setCookie(_cookieName, _cookieVal, _exSec) {
  const d = new Date();
  d.setTime(d.getTime() + (_exSec*24*60*60*1000));
  let expires = "expires=" + d.toGMTString();
  document.cookie = _cookieName + "=" + _cookieVal + ";" + expires + ";path=/;Secure;SameSite=Strict";
}

//Fetching a Cookie

function _$fetchCookie(_cookieName) {
  let name = `${_cookieName}=`;
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');

  for(let i = 0; i < ca.length; ++i) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

//Confirming Cookie for Cookie Related Functions

function _confirmCookie() {
  let user = _$fetchCookie("username");
  if (user !== "") return true;
  else return false;
}

//Load User Database

function loadUserDatabase() {
  	loadUsrPreferences();
  	loadUsrInformation();
  	userPresenceState();
  	databaseFunction();
}

function lazyLoadByTimeout() {
    let loadLazily = setTimeout(function() {
		lazyLoadImg('lazy_load', 'img_loaded');
		clearTimeout(loadLazily);
    }, 2500);
}

(function() {
	//If User Cookie Already Exists
	if (_confirmCookie()) {
	  	userFormWrapper.remove();
	  	usernameCookie = _$fetchCookie("username");
	  	loadUserDatabase();
	} else{
		//If Cookie is deleted or doesn't exists => By CLick Event Set Cookie
		let authBg = document.getElementById("AuthBg");
		authBg.classList.add("no_Auth");
		authValdtbtn.addEventListener("click", function() {
			let userVal = logInusrName.value || signUpusrName.value;
			usernameCookie = _$fetchCookie("username");
			ValidateUser(userVal);
		});
 	}
})();


//Authentication Functions => Change textCOntent of button from "Login" To "Signup"

function AuthBtnValueFn(stringVal, callCheckFn, stringToCheck) {
	//For Changing innerext only
    if (stringVal) {
        authValdtbtn.innerText = stringVal; 
    } else { 
	    // Check if Authenticate Button has value of login or signup
        if (stringToCheck && callCheckFn) {
            const authValdtbtnText = authValdtbtn.innerText.toLowerCase();
            const stringToCheckCase = stringToCheck.toLowerCase();
            
            if (authValdtbtnText === stringToCheckCase) return true;
            else return false;
        }
    }
}

//Authentication Functions => Clearing all Errors while validating Inputs of login and Signup

function clearValidation(clrValidateType) {

    const clrValidateTypeCase = clrValidateType.toLowerCase();
    
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
    if (clrValidateTypeCase === 'loginclr') clearLoginValidate();
    else if (clrValidateTypeCase === 'signupclr') clearSignupValidate();
}

//Authentication Events => onKeyUp Clearing validation

logInusrName.addEventListener("keyup", function() {
    clearValidation('loginclr');
});
signUpusrName.addEventListener("keyup", function() {
    clearValidation('signupclr');
});

//Authentication Functions => Clearing Auth Info to avoid both login and signup values 

function clearAuthInfo(){
    logInusrName.value = '';
    signUpusrName.value = '';   
    logInPass.value = '';
    signUpPass.value = '';

    clearValidation('loginclr');
    clearValidation('signupclr');
}

//Authentication Events => onClick Animate the Divs from Login to SignUp or Vice versa 

jmptoLogin.addEventListener("click", function() {
    clsLogIn.classList.add("animate-shutter-up");
    clsLogIn.classList.remove("animate-shutter-down");
    AuthBtnValueFn('Signup');
    clearAuthInfo();
});
jmptoSignUp.addEventListener("click", function() {
    clsLogIn.classList.add("animate-shutter-down");
    clsLogIn.classList.remove("animate-shutter-up");
    AuthBtnValueFn('Login');
    clearAuthInfo();
});

//Authentication Functions => Validating User for Login or SignUp

function ValidateUser(usrNameGet){

	//Validating User Function => Show Error on Inputs 

    function usrFetchingHandlingError(errType) {
        
        const errTypeCase = errType.toLowerCase();

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
        
        if (errTypeCase === 'login') errorLogingIn();
        else if(errTypeCase === 'signup') errorSigningUp();
    }

	//Validating User Functions => If validation is not wrong then remove the Wrapper

    function validatationSuccess() {        
        topLoading.classList.add("top-loading-start");

        topLoading.addEventListener("animationend", function() {
            userFormWrapper.classList.add("cls-form");
            let usrWrapAnimate = setTimeout(() => {
                userFormWrapper.remove();
                clearTimeout(usrWrapAnimate);
            }, 2500);
        });
		setCookie("username", usrNameGet, 30);
		loadUserDatabase();
    }

    //Check Existence of UserName in DataBase 

    dataBase.ref(`Collo Chat/Users Info`).once("value", (usrExists) => {
        let usrLoginFlag = false;
        let usrSignupFlag = true;

        let UsrEachKeyPath = Object.keys(usrExists.val());
        let UsrEachKeyPathLen = UsrEachKeyPath.length;

        for (let i = 0; i < UsrEachKeyPathLen; ++i) {
        	//Checking State of login
            if (AuthBtnValueFn('' , true, 'login')) {
            	//Can Login if Exist
                if (UsrEachKeyPath[i] === usrNameGet) {
                    usrLoginFlag = true;
                }
            } else if (AuthBtnValueFn('' , true, 'signup')) {
              	//Cannot SignUp, As user already Exists in Database
                if (UsrEachKeyPath[i] === usrNameGet) {
                    usrSignupFlag = false;
                }
            }
        }

        if (AuthBtnValueFn('', true, 'login')) {
            if (!usrLoginFlag) usrFetchingHandlingError('login');
            else validatationSuccess();
        } else if(AuthBtnValueFn('', true, 'signup')) {
            if (!usrSignupFlag) usrFetchingHandlingError('signup');
            else validatationSuccess();
        }

    });
}

//CLIENT SIDE : Function For Lazy Loading Image for Optimizaton

function lazyLoadImg(imgsElems, imgsElemsLoded) {
	//Set Src to Image After page Loading
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

//CLIENT SIDE : Function of Modal of Settings and Details Function 

function userModalVisibility(state) {
	let usrMdl = document.getElementById("mainUsrMdl");
	if (!state) usrMdl.classList.remove("animation");	
	else usrMdl.classList.add("animation");	
}

function loadBackgroundImages() {
	let lazyBgImg = setTimeout(() => {
		lazyLoadImg('lazy_load_cdn', 'img_loaded_cdn')
		clearTimeout(lazyBgImg);
	});
}

mdlUsrShwBtn.addEventListener("click", loadBackgroundImages);

mdlUsrShwBtn.addEventListener("click", function() {
	userModalVisibility(true);
});

mdlUsrsClsBtn.addEventListener("click", function() {
	userModalVisibility(false);
	mdlUsrShwBtn.removeEventListener("click", loadBackgroundImages);
});


function editModalVisibilty(state) {
	let usrMdl = document.getElementById("editUsrMdl");
	if (!state) usrMdl.classList.remove("edit_animation");	
	else usrMdl.classList.add("edit_animation");	
}

eOp.addEventListener("click", function() {
	editModalVisibilty(true);
});

eCls.addEventListener("click", function() {
	editModalVisibilty(false);
});	

//CLIENT SIDE : Function for Loading user's Details and Settings

(function() {
	let pillLight = document.getElementById("evtTagLight");
	let pillDark = document.getElementById("evtTagDark");
	let pillTextr = document.getElementById("evtTagTextr");

	//Background Image Tabs

	function bgTabOpen(bgTagId) {
		let bgId = document.getElementById(`${bgTagId}`);

		let swtchBgs = document.getElementsByClassName("swtch_bgs");
		let swtchBgsLen = swtchBgs.length

		for (let i = 0; i < swtchBgsLen; ++i) swtchBgs[i].classList.remove("swtch_bgs_actv");
		
		bgId.classList.add("swtch_bgs_actv")	
	}
	
	//Pill Buttons Trigger tabs

	pillLight.addEventListener("click", function() {
		bgTabOpen('tagLight');
	});
	pillDark.addEventListener("click", function() {
		bgTabOpen('tagDark');
	});
	pillTextr.addEventListener("click", function() {
		bgTabOpen('tagTextr');
	});
	
	selectElements({Elemname: ".grid_img_hold img.bg_tags_imgs", ClassName: "bg_img_setted"});
	selectElements({Elemname: ".pill_btns", ClassName: "actvBgTag"});

})();

//CLIENT SIDE : Function Add Active Class Dynamically 

function selectElements({Elemname: elemN, ClassName: clsName, TimeOut: timeCs}) {   
	let elems = document.querySelectorAll(elemN);
	let elemsLen = elems.length;
    let clsByTIme;

    if (timeCs) {
        clsByTIme = setTimeout(function() {
            for (let i = 0; i < elemsLen; ++i) {
                elems[i].classList.remove(clsName);
            }
        }, timeCs);
    }
	
	for (let i = 0; i < elemsLen; ++i) {
	  elems[i].addEventListener("click", function() {
    
        clearTimeout(clsByTIme);

	    let crntCls = document.getElementsByClassName(clsName);

	    if (crntCls.length > 0) crntCls[0].className = crntCls[0].className.replace(` ${clsName}`, "");

	    this.className += ` ${clsName}`;
	
	  });
	}
}

//CLIENT SIDE : Function focus text Element

function focusTextBox(wToogle) {
   if(wToogle) {
         msgInpt.focus();
    } else {
        msgInpt.blur();
    }
}

//CLIENT SIDE : Function Setting reply on Opened Board

function setReply({
	TextReply: txtReply, 
	ImageReply: imgReply,
	FromUserReply: usrFrmRply, 
	AccentColor: accColor 
}) {
	let replyMainDiv = document.getElementById("rplyClsEn");
    let rplyUsrFrm = document.getElementById("rplyFrmUsr");
	let replySpnVar = document.getElementById("rplySpn");
	let replyLftLine = document.getElementById("textRplylftLine");

    let rplyImageHolder = document.getElementById("replYImageDiv");
    let rplyImage = document.getElementById("repliedImage");

    rplyUsrFrm.innerText = usrFrmRply;

	rplyUsrFrm.style.color = `${accColor}`;
	replyLftLine.style.backgroundColor = `${accColor}`;

    replySpnVar.innerHTML = txtReply; 

    //For Image reply

    if(imgReply) {
        rplyImage.src = imgReply;
        rplyImageHolder.classList.add("visible_now");
    } else {
        rplyImageHolder.classList.remove("visible_now");
        rplyImage.removeAttribute("src");
    }

    if (replySpnVar.innerText) {
    	if (!replyMainDiv.classList.contains("replyEnabled")) {
    		replyMainDiv.classList.add("replyEnabled");
    	}
    } else replyMainDiv.classList.remove("replyEnabled");
    
    focusTextBox(true);
}

//CLIENT SIDE : Function Snackbar Function to Notify Actions

function showSnackNotification({
	icon: icn, 
	notifAbout: infTxt, 
	isWarning: warnbool
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

    if(warnbool) {
		snackIcon.classList.add("warn_notif");
		snackInfo.classList.add("warn_notif");
    }

    widthSnack.addEventListener("animationend", function() {
	    snackBar.classList.remove("slide_in_snack");
	    snackBar.classList.add("slide_out_snack");
	    widthSnack.classList.remove("animate_width");
    });

}

//CLIENT SIDE : Function for Modal of Image

imgAttachBtn.addEventListener("click", function() {
    imgSrcSet.src = '';
    captTxt.value = '';

    imgchtAttach.click();
    
    focusTextBox(true);
});

//CLIENT SIDE : Function Send Message on Enter Event

msgInpt.addEventListener("keyup", function() {
	if (this.innerText.trim().length > 0) {
		audioBtn.style.transform = "scale(0)";
		stopBtn.style.transform = "scale(0)";
		sendBtn.style.transform = "scale(1)";
	} else{
		audioBtn.style.transform = "scale(1)";
		stopBtn.style.transform = "scale(1)";
		sendBtn.style.transform = "scale(0)";
	}
})

msgInpt.addEventListener("keydown", function(entEvt){
	if (msgInpt.innerText !== '') {
	    if (entEvt.code === 'Enter' && !entEvt.shiftKey) {
	        entEvt.preventDefault();
        	SendMessage();
	    }
	} else {
	    if (entEvt.code === 'Enter' && !entEvt.shiftKey) {
	       entEvt.preventDefault();
	       return false;
	    }

	}
	
	// Events for Formatting Text COntent

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

//CLIENT SIDE : Function of Events To Post 

(function() {
	let offset = 0;
	let paused = true;
	let mediaRecorder = null;

	showRecordTime();
	  
	function startRecordTime(evt) {
	  if (paused) {
	    paused = false;
	    offset = offset - Date.now();
	    showRecordTime();
	  }
	}

	function stopRecordTime(evt) {
		if (!paused) {
			paused = true;
			offset += Date.now();
		}
	}
	function resetRecordTime(evt) {
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

		if(!paused) {
		requestAnimationFrame(showRecordTime);
		}
	}

	audioBtn.addEventListener('click', function () {
		startRecordTime();

		recordTimeHold.classList.add("is-recording");
		
		let constraints = {audio: true};

		navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
			let mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.start();
			let chunks = [];

			mediaRecorder.addEventListener('dataavailable', function (dataEvtAudio) {
				const evtData = dataEvtAudio.data;
				chunks.push(evtData);
			});

			audioBtn.style.transform = "scale(0)";
			sendBtn.style.transform = "scale(1)";
			stopBtn.style.transform = "scale(1)";
			
			mediaRecorder.addEventListener('stop', function () {
				let audFile = new FileReader();
			
				audFile.addEventListener("load", function() {
					let base64AudioURL = audFile.result;
					clientAudio.src = base64AudioURL;
					sendAudio();
				});

				msgInpt.contentEditable = "true";
			
				let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
				audFile.readAsDataURL(blob);
				chunks = [];
			});

			stopBtn.addEventListener('click', function () {
				mediaRecorder.stop();
				stopRecordTime();
				resetRecordTime();

				recordTimeHold.classList.remove("is-recording");
				
				stopBtn.style.transform = "scale(0)";
				audioBtn.style.transform = "scale(1)";
				sendBtn.style.transform = "scale(0)";
			});
		});
	});
})();

submit.addEventListener("click", SendImage);

//CLIENT SIDE : Function of Clear reply By Event onclick 

replyClr.addEventListener("click", function(){
	setReply({
		TextReply: '',
		ImageReply: '',
		FromUserReply: '',
	});
});


// CLIENT SIDE : Function of Optimizing Performance by compressing Img

let compressImg = {
	compress: function(t, e, n) {
		var a = "image/jpeg";
		"undefined" != typeof n && "png" == n && (a = "image/png");
		var r = document.createElement("canvas");
		r.width = t.naturalWidth, r.height = t.naturalHeight;
		var o = (r.getContext("2d").drawImage(t, 0, 0), r.toDataURL(a, e / 100)),
			s = new Image;
		return s.src = o, s
	}
}

// function scrollToBottom() {
// 	let chtAreaMsgHeight = chtAreaMsg.scrollHeight;
// 	console.log(chtAreaMsg.scrollTop, chtAreaMsgHeight);
// 	if (chtAreaMsg.scrollTop > chtAreaMsgHeight || document.documentElement.scrollTop > chtAreaMsgHeight) {
// 		scrllToBtm.classList.add("fully_scrolled");
// 	}else scrllToBtm.classList.remove("fully_scrolled");
// }

// scrollToBottom();

// chtAreaMsg.addEventListener("scroll", scrollToBottom);

scrllToBtm.addEventListener("click", () => chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight);

//Database Functions => UserDetails
function loadUsrInformation() {
	const dbUsrsAbout = dataBase.ref(`Collo Chat/Users Info/${usernameCookie}/UserDetails`);

	let usrFirstName = document.getElementById("firstNameInput");
	let usrLastName = document.getElementById("lastNameInput");
	let usrAboutStats = document.getElementById("usrAbout");
	let usrImgfile = document.getElementById("usrImgByFile");
	let editUsrChgBtn = document.getElementById("editUserDetails");

	function usrDetailsEdit(){
		usrFirstName.removeAttribute("disabled");
		usrLastName.removeAttribute("disabled");
		usrAboutStats.removeAttribute("disabled");
		
		editUsrChgBtn.removeEventListener("click", usrDetailsEdit);
		editUsrChgBtn.addEventListener("click", usrDetailsSave);

		editUsrChgBtn.innerText = "done";
	}

	function usrDetailsSave(){
		usrFirstName.setAttribute("disabled", "true");
		usrLastName.setAttribute("disabled", "true");
		usrAboutStats.setAttribute("disabled", "true");

		dbUsrsAbout.update({UserFirstName: usrFirstName.value});
		dbUsrsAbout.update({UserLastName: usrLastName.value});
		dbUsrsAbout.update({UserBio: usrAboutStats.value}).then(() => {
			showSnackNotification({icon: "settings", notifAbout: "Changes Saved"})
		});
		
		editUsrChgBtn.removeEventListener("click", usrDetailsSave);
		editUsrChgBtn.addEventListener("click", usrDetailsEdit);

		editUsrChgBtn.innerText = "edit";
	}

	editUserDetails.addEventListener("click", usrDetailsEdit);

    //User Profile Pic Change

	imgUpload.addEventListener("change", function(fileEvt) {
	    let oneFile = fileEvt.target.files[0];

	    let imgBlob = URL.createObjectURL(oneFile);

	    let usrPrfImgLoad = document.getElementById("usrPrfImage");
	    let usrPrfImgLoadCir = document.getElementById("usrPrfImageCircleLoad");
	    let usrPrfImgLoadCirpath = document.getElementById("usrPrfImageLoadPath");
	    let monoChrmeIco = document.getElementById("changeToLoad");
	    let prfImgNum = document.getElementById("prfImgLoadNums");

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
	    		dbUsrsAbout.update({UserProfileImage: url});
				ImageLoaderState(usrPrfImgLoad, usrPrfImgLoadCir, usrPrfImgLoadCirpath, false);
				monoChrmeIco.innerText = 'monochrome_photos';
	    	});
	    });
	});

    //Setting Profile Pic from Database

	dbUsrsAbout.on('value', (usrAbtSnp) => {
		let usrDetailsSnp = usrAbtSnp.val();

		let usrStatusExits = usrAbtSnp.child('UserBio').exists();
		let userProfilePicExists = usrAbtSnp.child('UserProfileImage').exists();
		let usrFirstNameExists = usrAbtSnp.child('UserFirstName').exists();
		let usrLastNameExists = usrAbtSnp.child('UserLastName').exists();

		let editImage = document.getElementById("editImage");

		userNamePrevw.innerText = usernameCookie;
		imgUsrName.innerText = usernameCookie;

        if (usrStatusExits) {
        	usrAboutStats.value = usrDetailsSnp.UserBio;
        	userBioPrevw.innerText = usrDetailsSnp.UserBio;
        }
        if (usrFirstNameExists){
	         usrFirstName.value = usrDetailsSnp.UserFirstName;
		}
    	if (usrLastNameExists){
        	 usrLastName.value = usrDetailsSnp.UserLastName;
		}
		
        if (userProfilePicExists) {
        	const userPic = usrDetailsSnp.UserProfileImage;
			usrImgUrl.setAttribute("src", `${userPic}`);
			usrImgUrl.addEventListener("load", function() {
				editImage.setAttribute("src", `${userPic}`);
				usrFallbackPic.setAttribute("style", `background-image: url(${userPic})`);
			});
		} else{
			const defaultPic = `https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png`;
			usrImgUrl.setAttribute("src", `${defaultPic}`);
			editImage.setAttribute("src", `${defaultPic}`);
		}
	});

}
//Database Functions => User Preferences

function loadUsrPreferences() {
	const dbUsrsSettings = dataBase.ref(`Collo Chat/Users Info/${usernameCookie}/UserSettings`);

	const toggleButton = document.querySelector(".dark-light");
	const clrThemes = document.querySelectorAll(".color");
	let userBgImg = document.querySelectorAll(".grid_img_hold img.bg_tags_imgs");
	let bdBody =  document.querySelector("body");

    //Initializing Mode and Theme to avoid data type "undefined"

	let dbTheme = 'light';
	let chtClr = 'blue';

    //For all Color Themed Divs

	clrThemes.forEach((color) => {
	    
	    color.addEventListener("click", (e) => {
	        const theme = color.getAttribute("data-color");
	        
	        //Remove Selected from each color themed Divs
	        clrThemes.forEach((c) => c.classList.remove("selected"));
	        
	        document.body.setAttribute("data-theme", theme);
	        
	        color.classList.add("selected");
				        
	        dbUsrsSettings.update({ChatTheme: theme});
	    });

	});

    //Funtion for Setting Dark Mode

	toggleButton.addEventListener("click", () => {
	    document.body.classList.toggle("dark-mode");

	    if (document.body.classList.contains("dark-mode")) dbTheme = 'dark';
	    else dbTheme = 'light';
		
		dbUsrsSettings.update({AppTheme: dbTheme});
	});

    //Funtion for Setting Chat BackgroundImage

	userBgImg.forEach(function(dpChg) {
		dpChg.addEventListener("click", function() {
			let chtBgSrc = this.src;
			chtarea.style.backgroundImage = `url('${chtBgSrc}')`;
			dbUsrsSettings.update({ChatBackground: chtBgSrc});
		});
	});

	dbUsrsSettings.on('value', (usrThmeSnp) => {

		const themeSnap = usrThmeSnp.val();

        //Check Existence of child to avoid getting Error

		const dbBoolThemeExsits = usrThmeSnp.child('AppTheme').exists();
		const dbBoolbgSrcExsits = usrThmeSnp.child('ChatBackground').exists();
		const dbBoolchtThemeExsits = usrThmeSnp.child('ChatTheme').exists();

        //Set Chat Mode (Light or Dark) From Database

		if (dbBoolThemeExsits) {
			if (themeSnap.AppTheme === 'dark') document.body.classList.add("dark-mode");
			else document.body.classList.remove("dark-mode");
		} else document.body.classList.remove("dark-mode");

        //Set Chat Background From Database and Lazy Load

		if (dbBoolbgSrcExsits) {
            chtarea.style.backgroundImage = `url("${themeSnap.ChatBackground}")`;
        } else{
        	chtarea.style.backgroundImage = `https://i.imgur.com/3WsM0C8.png`;
        }

        //Set Chat Theme From Database

		if (dbBoolchtThemeExsits) {
            let chtTheme = themeSnap.ChatTheme;
			document.body.setAttribute("data-theme", chtTheme);
			clrThemes.forEach((clrsDB) => {
				clrsDB.classList.remove("selected");
			});

			if (chtTheme === '#0086ff') clrThemes[0].classList.add("selected");
			else if (chtTheme === '#9f7aea') clrThemes[1].classList.add("selected");
			else if (chtTheme === '#38b2ac') clrThemes[2].classList.add("selected");
			else if (chtTheme === '#ed8936') clrThemes[3].classList.add("selected");
			else if (chtTheme === '#ff69b4') clrThemes[4].classList.add("selected");
			else if (chtTheme === '#80bfff') clrThemes[5].classList.add("selected");
			else if (chtTheme === '#ff6666') clrThemes[6].classList.add("selected");
			else if (chtTheme === '#04a96a') clrThemes[7].classList.add("selected");
			else clrThemes[0].classList.add("selected");
		}
		
	});
}

//Database Function => User Presence System
function userPresenceState() {
	const userStatusRef = dataBase.ref(`Collo Chat/Users Info/${_$fetchCookie("username")}`).child("Presence");

	userStatusRef.set({
	   Status: "Online"
	});

	userStatusRef.on('value', (usrState) => {
	    if (usrState.val() === false) return;

		let dateOffline = new Date();
		let usrLastHrs = dateOffline.getHours();
		let usrLastMins = dateOffline.getMinutes();
		let usrLastSecs = dateOffline.getSeconds();
	    
	    if(usrLastHrs < 10) usrLastHrs = `0${usrLastHrs}`;
	    if(usrLastMins < 10) usrLastMins = `0${usrLastMins}`;
	    if(usrLastSecs < 10) usrLastSecs = `0${usrLastSecs}`;

	    userStatusRef.onDisconnect().update({
		   Status: `Last Seen at ${usrLastHrs}:${usrLastMins}:${usrLastSecs}`
	    });

	});	
}

//Database Functions => Default Online Members

function getOnlineUsers() {
	const applicationUsersdb = dataBase.ref("Collo Chat/Users Info");
	applicationUsersdb.on('value', (userOnline) => {
		let dbFetchOnline = userOnline.val();
		  
        let totalMembers = Object.keys(dbFetchOnline);
        let totalMembersLen = totalMembers.length;

        let memOnlineCnt = 0;

        //Fetching Object Keys for "For Loop"

        let memberNumber = document.getElementById("MemNum");
	    let onceMemberOnline = document.getElementById("MemOnline");

        memberNumber.innerText = `${totalMembers.length}`;

        for (let i = 0; i < totalMembersLen; ++i) {
			if (dbFetchOnline[totalMembers[i]].Presence.Status === 'Online') memOnlineCnt = ++memOnlineCnt;	
			if (memOnlineCnt > 1) onceMemberOnline.innerText = memOnlineCnt-1;
			else onceMemberOnline.innerText = 'No one is ';
        }
	});
}
getOnlineUsers();

//Database Functions => Members in Group
function getMembersLists() {
	const mainApplicationdb = dataBase.ref("Collo Chat/Users Info");

	mainApplicationdb.once('value', (usersSnaps) => {

		let dbFetchKeys = usersSnaps.val();
		  
        //Fetching Object Keys for "For Loop"

        let usrWeb = Object.keys(dbFetchKeys);
		
        let usrWebLen = usrWeb.length;
        
        //Creating Arrays for setting them in Sequence

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

            //Check Existence and Push Values in array

			if(usersSnaps.child(`${users}/UserDetails/UserProfileImage`).exists()) userImgUrlArr.push(dbFetchKeys[users].UserDetails.UserProfileImage);
			else userImgUrlArr.push('https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png');

			if(usersSnaps.child(`${users}/Presence`).exists()) userPresence.push(dbFetchKeys[users].Presence.Status);
			else userPresence.push("Last Seen Recently");

			// if (memAbout.innerText === 'Online') memAbout.classList.add("online_mem_spn");

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

//Database Functions => RealTime All Users Presence States  

function realTimeuserPresence() {
	const allUserStatus = dataBase.ref("Collo Chat/Users Info");
    
    let memberOnline = document.getElementById("MemOnline");

	allUserStatus.on("value", function(usrStatus) {
		//Resetting array

	    let memOnlineArr = [];
	    let memOnlineNum = 0;

		let allusrArr =  usrStatus.val();

	    let allUsrs = Object.keys(usrStatus.val());
	    let allUsrsLen = allUsrs.length; 

		let staticMemPresence = document.getElementsByClassName("member_info_holder");
		let staticMemPresenceLen = staticMemPresence.length;

	    for (let i = 0; i < allUsrsLen; ++i) {
			memOnlineArr.push(allusrArr[allUsrs[i]].Presence.Status);

			let staticMemList = staticMemPresence[i].getElementsByClassName("user_online_state")[0];
			let staticMemSpn = staticMemList.getElementsByTagName("span")[0];

			if(allusrArr[allUsrs[i]].Presence.Status === "Online") {
				staticMemSpn.innerText = 'Online';
		    	staticMemList.classList.add("online_mem");
			} else{
		    	staticMemSpn.innerText = `${allusrArr[allUsrs[i]].Presence.Status.slice(0, -3)}`;
		    	staticMemList.classList.remove("online_mem");
			}

	    	/*if (staticMemPresence[i].innerText === 'Online') {
	    		// staticMemPresence[i].classList.add("online_mem_spn");
	    		// staticMemImg.add("online_mem");
	    	}*/ /*else staticMemImg.remove("online_mem");*/
	    }
	});
}

//Function Event of Side panel where members are visible
function groupPanel() {
	let sidePnl = document.getElementById("sidePanel");
	sidePnl.classList.toggle("show_panel");
	sidePnlBtn.removeEventListener("click", getMembersLists);
}

sidePnlBtn.addEventListener("click", getMembersLists);

sidePnlBtn.addEventListener("click", groupPanel);

//Database Chat => Getting Time

function userPostTime() {
	const chtDate = new Date();
	
    const chtHrs = chtDate.getHours();
	const chtMins = chtDate.getMinutes();

	const chtMinsTern = (chtMins<10?"0":"")+chtMins;
    let parseHr = parseInt(chtHrs);

    if (parseHr > 12) parseHr = parseHr - 12;
	
	const parseHrTern = (parseHr<10?"0":"")+parseHr;

    const meredian = (chtHrs<=11?"am":"pm");

	const timeStr = `${parseHrTern.toString()} : ${chtMinsTern} ${meredian}`;

	return timeStr;
}

//Database Chat => After Posting Functions

function afterPostFunctions() {
    msgInpt.innerText = '';
	setReply({
		TextReply: '',
		ImageReply: '',
		FromUserReply: '',
	});
    chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;
}

//Database Chat => Set Unique Id TO Each Chat Bubble

function generateUniqueId(){
    const msgDatId = Date.now();
    return msgDatId;
}

//Database Chat => Posting text chat in Group Chats Child

function SendMessage() {
    const rplyAccClr = rplyDbFromUsr.style.color;

    const rplyChkDb = rplSpn.innerHTML?rplSpn.innerHTML:"";
    const rplyFrmUsrChk  = rplyDbFromUsr.innerText?rplyDbFromUsr.innerText:"";

    const rplImage = document.getElementById("repliedImage").src;
    const rplyImageChk = rplImage?rplImage:"";
  
    const getUniqueIdforText = generateUniqueId();
  
    const usrPostTime = userPostTime();

    const grpChatsDb = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdforText}`);

    const textDomCorresId = rplyDomElemId.value

    const msgInptVal = msgInpt.innerHTML;
  
    if(rplyFrmUsrChk){
		if(rplyImageChk) {
		    grpChatsDb.set({
		        User: usernameCookie,
		        Message: msgInptVal,
		        ReplyAccentClr: rplyAccClr,
				ReplyString: rplyChkDb,
				ReplyImage: rplyImageChk,
				ReplyOfUser: rplyFrmUsrChk,
		        PostTime: usrPostTime,
		        DomId: getUniqueIdforText,
		        DomCorresId: textDomCorresId
		    });
		} else{
		    grpChatsDb.set({
		        User: usernameCookie,
		        Message: msgInptVal,
		        ReplyAccentClr: rplyAccClr,
				ReplyString: rplyChkDb,
				ReplyImage: "",
				ReplyOfUser: rplyFrmUsrChk,
		        PostTime: usrPostTime,
		        DomId: getUniqueIdforText,
		        DomCorresId: rplyDomElemId.value 
		    });
		}
    }  else {
	    grpChatsDb.set({
	        User: usernameCookie,
	        Message: msgInptVal,
	        PostTime: usrPostTime,
	        DomId: getUniqueIdforText
	    });
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

//Database Chat => Posting Image in Group Chats child

function SendImage(){
  const getImgSrcCht = imgSrcSet.src;
  
  if (getImgSrcCht!=="") {
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

	  const dbRefImg = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdforImg}`);

	   dbRefImg.set({
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
	    });

      afterPostFunctions();
  }
	modal.style.display = 'none';
	submit.setAttribute("disabled", "true");
}

//Database Chat => Posting audio in Group Chats child

function sendAudio() {
	const getUniqueIdforAudio = generateUniqueId();
	const audioUrltoPost = document.getElementsByClassName("audio-msg")[0].src;
	const audioPostTime  = userPostTime();

	const dbRefAudio = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdforAudio}`);

	dbRefAudio.set({
        User: usernameCookie,
        AudioURL: audioUrltoPost,
        PostTime: audioPostTime,
        DomId: getUniqueIdforAudio
	});

	afterPostFunctions();
}


//Database Chat => File Handling!

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
	// else modal.display = 'none';	
	imageAttachHold.classList.remove("file_drag");
});

//Database Chat => Events to avoid unnessesary bugs and errors 

imgchtAttach.addEventListener("focus", function() {
	submit.setAttribute("disabled", "true");
});

clsImgMdl.addEventListener("click", function() {
      modal.style.display = 'none';
      filenameSpn.innerText = "File Name";
});

//Database Chat => All Database Functions

function databaseFunction() {
	const mainDb = dataBase.ref("Collo Chat");
	const fetchChat = dataBase.ref("Collo Chat/Web Developers/Group Chats");
	const pinMessageDb = dataBase.ref(`Collo Chat/Web Developers/Pinned Messages`);
	const saveMsgGrp = dataBase.ref(`Collo Chat/Web Developers/Saved Messages/${usernameCookie}`);
	const grpDb = dataBase.ref(`Collo Chat/Web Developers/Group Info`);


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

	//function for Save Messages
	function saveMsgPanel() {
		let saveMsgMdl = document.getElementById("saveMsgModal");
		saveMsgMdl.classList.toggle("show_saved_msg");
	}

	saveMsgBtn.addEventListener("click", saveMsgPanel);
	saveMsgCls.addEventListener("click", saveMsgPanel);

	grpFileReader.addEventListener("change", function(grpPicChg) {
	    const grpPic = cldStorage.ref(`Web Developers/Profile_pic`);
	    
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
					fetchChat.child(`${uniquegrpImgId}_contentInfo`).set({
						contentInfo: imgChangerInfo
					});
				    ImageLoaderState(grpPrfImgLoad, grpPrfImgCir, grpPrfImgCirPath, false);
				    grpCamIcon.innerText = 'camera_alt';
				    grpEditOverlay.classList.remove("stay_overlayed");
	    		});
	    	});
	    });
	});

	grpDb.on("value", function (grpInfo) {
		const getGrpInfo = grpInfo.val();
		const getGrpDesc = getGrpInfo.GroupDesc;

		const grpImages = document.getElementsByClassName("$groupImg");
		const grpImagesLen = grpImages.length;

		for (let i = 0; i < grpImagesLen; ++i) grpImages[i].src = getGrpInfo.GroupImg;

		grpDescInpt.innerText = getGrpDesc;
	});

	//Database Function => After Child is Removed
	
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
			}, 250);
		} else{
			msgBubble.parentElement.classList.add("chat-bubble-removed");
			let dbDelTimeout = setTimeout(()=> {
				msgBubble.parentElement.remove();
				clearTimeout(dbDelTimeout);
			}, 250);
		}

	});

	//Database Function => After Child is Edited

	fetchChat.on("child_changed", function(chngChildSnp) {
		let chngChildVal = chngChildSnp.val();
		let chngChildId = chngChildVal.DomId;
		let chngChildMsg = chngChildVal.Message;

		let chngElem = document.getElementById(chngChildId);
		chngElem.innerText = chngChildMsg;
	});

	//Database Function => After Child is Added

	fetchChat.on("child_added", function (dbChatSnp) {
	    let dbFetch = dbChatSnp.val();

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
		    //Confirming User By Cookie

		    const getCookieDb = _$fetchCookie("username");

		    let lstMsg = document.getElementById("lastMsg");
		    let lstMsgtime = document.getElementById("lastMsgTime");
		    let chtRplyMsgTxt = document.getElementById("rplySpn").innerText;

			let chatMsg = document.createElement("div");
			let chtMsgProf = document.createElement("div");
			let chtMsgdate = document.createElement("div");
			
		    let chtMsgCOnt = document.createElement("div");
			let chtTxt = document.createElement("div");

		    let chtReplyBtn = document.createElement("button");

		    let chtusrOptH = document.createElement("div");
		    let chtusrOptDiv = document.createElement("div");

		    let usroptBtnCopy = document.createElement("button");
		    let usroptBtnCopyIco = document.createElement("i");

		    let usrOptBtnPin = document.createElement("button");
		    let usrOptBtnPinIco = document.createElement("i");

		    let usroptBtnSave = document.createElement("button");
		    let usroptBtnSaveIco = document.createElement("i");

		    let chtMainMsg = document.createElement("div");

			chatMsg.classList.add("chat-msg");
		    chtReplyBtn.classList.add("reply_msg_btn");
		    chtReplyBtn.classList.add("material-icons");
			chtMsgProf.classList.add("chat-msg-profile");
			chtMsgdate.classList.add("time");
			chtMsgCOnt.classList.add("chat-msg-content");

		    chtusrOptH.classList.add("usr_opts_h");
		    chtusrOptDiv.classList.add("usr_opt_main_div");

		    usroptBtnCopy.classList.add("usr_opts_btn");
		    usroptBtnCopyIco.classList.add("material-icons");

		    usrOptBtnPin.classList.add("usr_opts_btn");
		    usrOptBtnPinIco.classList.add("material-icons");

		    usroptBtnSave.classList.add("usr_opts_btn");

			chtTxt.classList.add("chat-msg-text");
		    chtMainMsg.classList.add("usr_main_msg");

		    chtMainMsg.setAttribute(`id`, `${dbFetch.DomId}`);

			function ReplyMessage(accentClr, elemTxt, frmUsr, imageRply) {

		    	chatMsg.classList.add("replyingCurr");

		    	let clsReplySet = setTimeout(function() {
		    		chatMsg.classList.remove("replyingCurr");
		    		clearTimeout(clsReplySet);
		    	}, 1000);



				if(!imageRply) {
					setReply({
						AccentColor: accentClr,
						TextReply: elemTxt,
						FromUserReply: frmUsr,
					});
				}
				else {
					setReply({
						AccentColor: accentClr,
						TextReply: elemTxt,
						FromUserReply: frmUsr,
						ImageReply: imageRply
					});
				}

		        focusTextBox(true);
			}
		
		    function getAccentClrDB(fromUserName) {
		        let getColorTheme;
		        dataBase.ref(`Collo Chat/Users Info/${fromUserName}/UserSettings`).once("value", function(getColor) {
		        	getColorTheme = getColor.val().ChatTheme;
		        });
	        	return getColorTheme;
		    }

		    function removeSelectClass() {
		        chatMsg.classList.remove("selected_message");
		    }

		    function addSelectClass() {
		        selectElements({
		        	Elemname: '.chat-msg', 
		        	ClassName: 'selected_message', 
		        	TimeOut: 7500
		        });
		    }

		    //if Current User is sending Message

		    if (dbFetchUser === getCookieDb) {
		    	chatMsg.classList.add("owner");
		        
		        let usrOptCls = document.getElementsByClassName("usr_opts_btn");
		        let usrOptClsLen = usrOptCls.length;
		        
		        let msgOrininalVal;

				let chtMsgStatus = document.createElement("div");

				chtMsgStatus.classList.add("material-icons");
				chtMsgStatus.classList.add("delivered_status");

		        //Adding Edit Option for Current User Only

		        let usroptBtnEdit = document.createElement("button");
		        let usroptBtnEditIco = document.createElement("i");

			    let usroptBtnDel = document.createElement("button");
			    let usroptBtnDelIco = document.createElement("i");

		        usroptBtnEdit.classList.add("usr_opts_btn");
		        usroptBtnEditIco.classList.add("material-icons");

			    usroptBtnDelIco.classList.add("material-icons");
			    usroptBtnDel.classList.add("usr_opts_btn");
			    usroptBtnDel.classList.add("red_btn");

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
				chtusrOptDiv.appendChild(usroptBtnDel);

		        usroptBtnEdit.appendChild(usroptBtnEditIco);
		        chtusrOptDiv.appendChild(usroptBtnEdit);

				chtMsgProf.appendChild(chtMsgStatus);
		        
		        //Edit Message Trigger
		        usroptBtnEdit.addEventListener("click", function() {
		            let grandParentELemtxt = this.parentElement.parentElement;
		            grandParentELemtxt.removeEventListener("click", addSelectClass);

		            chtMainMsg.setAttribute('contentEditable', 'true');
		            chtMainMsg.focus();
		            
		            grandParentELemtxt.classList.add("focused");
		            removeSelectClass();

		            if (dbFetchImage) {
		            	if (!dbFetchMsg) {
		            		chtMainMsg.style.display = 'inline-block';
		            	}
		            }
		            
		            chatMsg.addEventListener("dblclick", function() {
		                if (this.classList.contains("selected_message")) this.classList.remove("selected_message");
		            });
		        });

		        //Database chat Options => Remove Message

				usroptBtnDel.addEventListener("click", function() {
					const rmvElemId = chtMainMsg.getAttribute("id");

					fetchChat.child(`${rmvElemId}`).remove().then(function() {
				        showSnackNotification({icon: 'delete_forever', notifAbout: 'Bubble Deleted!'});
				    }).catch(function() {
				    	showSnackNotification({icon: 'clear', notifAbout: 'Cannot Delete Bubble', isWarning: true})
				    });

				});

		        //KeyDown Event => Editing Chat message
		  	    chtMainMsg.addEventListener("keydown", function(entAttr) {
		  	        if ((entAttr.key === 'Enter')&&(!entAttr.shiftKey)) {
		  	            
		                entAttr.preventDefault();
		                const dataVId = this.getAttribute("id");
		  	            let datavIdConn = fetchChat.child(`${dataVId}`);
		  	            let inrTxt = this.innerText;

		  	            datavIdConn.update({msg: `${inrTxt}`}).then(function() {
		  	                showSnackNotification({icon: 'brush', notifAbout: 'Edited Sucessfully!'});
		  	                
		  	                chtMainMsg.removeAttribute("contentEditable");
		  	                chtMainMsg.parentElement.classList.remove("focused");

		  	                if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal; 
		  	                chtMainMsg.parentElement.addEventListener("click", addSelectClass);

		  	            });
		  	        }
		  	    });

		        //Focus Lost Event
		        chtMainMsg.addEventListener("blur", function() {
		            if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal;

		            this.removeAttribute("contentEditable");
		            this.parentElement.classList.remove("focused");

		            this.parentElement.addEventListener("click", addSelectClass);
		        });

		    } else{

		        //other Users Messages

		        let chtMsgUsrName = document.createElement("div");

		        chtMsgUsrName.classList.add("chat-msg-user");

		        chatMsg.classList.add("otherU");

		        dataBase.ref(`Collo Chat/Users Info/${dbFetchUser}/UserSettings`).once("value", function(getColor) {
		        	let getColorTheme = getColor.val().ChatTheme;
			        chtMsgUsrName.style.color = `${getColorTheme}`;
		        });
		        chtMsgUsrName.innerText = dbFetchUser;

		        chtTxt.appendChild(chtMsgUsrName);
		        
			    if (dbFetchImage) {
			    	if (!chtMainMsg.innerText) chtMainMsg.style.display = 'none';
			    }
		    }

		    //Reply Functions

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
		            ReplyMessage(getAccClr, imageIcon, dbFetchUser, dbFetchImage);
		        } else if(validURL(dbFetchMsg)) {
			    	const getClsLinkHold = chtMainMsg.getElementsByClassName("link_hold")[0];
			    	const getClsLinkTxt = getClsLinkHold.getElementsByClassName("link_text")[0].innerText;
			        ReplyMessage(getAccClr, getClsLinkTxt, dbFetchUser);
				} else if(dbFetchAudio){
					let audioIcon = `<i class="material-icons">volume_up</i> Audio`
					ReplyMessage(getAccClr, audioIcon, dbFetchUser)
				} else {
					const chtMsgInnerTxtGet = chtMainMsg.innerText;
		        	ReplyMessage(getAccClr, chtMsgInnerTxtGet, dbFetchUser);
		        }
		        focusTextBox(true);
		    }

		    //if Dataase Has Reply Message

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

		        //If database reply also contains Image

		        if (dbFetchRplyImage !== "") {

		            let rplyImageH = document.createElement("div");
		            let rplyImage = document.createElement("img");

		            rplyImageH.classList.add("replied_image_holder");
		            rplyImage.classList.add("replied_image");

		            rplyImage.src = dbFetchRplyImage;

		            rplyImageH.appendChild(rplyImage);
		            rplyDiv.appendChild(rplyImageH);
		        }

		        //From User's Message

		        rplyDivUser.innerText = dbFetch.ReplyOfUser;

		        //User Replied Message

				rplyDivSpn.innerHTML = dbFetchRply;

				rplyDiv.addEventListener("click", function(rplyShw) {
					rplyShw.preventDefault();
					rplyShw.stopPropagation();

					let scrollToDomId = document.getElementById(`${dbFetchScrollToId}`);
					
					let scrollToDomIdParentElement;

					if (dbFetchImage) {
						scrollToDomIdParentElement = scrollToDomId.parentElement.parentElement;
						console.log("scrollToDomIdParentElement", scrollToDomIdParentElement);
					}
					else {
						scrollToDomIdParentElement = scrollToDomId.parentElement.parentElement.parentElement;
						console.log("scrollToDomIdParentElement", scrollToDomIdParentElement);
					}
					

					scrollToDomIdParentElement.classList.add("scroll_in_view");
					
					let scrollClsRemove = setTimeout(() => scrollToDomIdParentElement.classList.remove("scroll_in_view"), 1000); 
					scrollToDomId.scrollIntoView({block: "center"});
				});

				rplyDiv.appendChild(rplyLeftLine);
				rplyDiv.appendChild(rplyDivUser);
				rplyDiv.appendChild(rplyDivSpn);
				chtTxt.appendChild(rplyDiv);
		    }

		    //If Chat message Has Image

		    if (dbFetchImage) {
		    	const dominentImgClrDb = dbFetch.ImageDominentClr; 

		    	let imgHolder = document.createElement("div");
		    	let imgMainClr = document.createElement("div");
		    	let imgTag = document.createElement("img");


		    	imgHolder.classList.add("cht_img_holder");
				imgHolder.style.backgroundColor = dominentImgClrDb;
		    	imgMainClr.classList.add("image_tag_button");

		    	chtTxt.classList.add("is_img");

		    	if (dbFetchMsg) {
			    	let imgCaption = document.createElement("div");
			    
			    	imgCaption.classList.add("text_caption");
			    			    	
			    	imgCaption.innerText = dbFetchMsg;
			    
			    	imgHolder.appendChild(imgCaption);
		    	} 

		    	chtTxt.setAttribute("id", `${dbFetchId}`);
		    		
		    	imgTag.setAttribute("src", dbFetchImage);

		    	imgHolder.style.height = `${dbFetchImageHeight}`;
		    	imgHolder.style.width = `${dbFetchImageWidth}`;

				imgTag.addEventListener("load", function() {
			    	imgHolder.style.backgroundColor = 'transparent';
			    	imgHolder.style.height = 'fit-content';
				});	
		    	imgMainClr.style.backgroundColor = dominentImgClrDb;

		    	imgHolder.appendChild(imgTag);
		    	imgHolder.appendChild(imgMainClr);
		    	chtTxt.appendChild(imgHolder);

		    	if (!dbFetchMsg) chtMainMsg.style.display = 'none';
		    } else if(dbFetchAudio) {

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

	    		dataBase.ref(`Collo Chat/Users Info/${dbFetchUser}/UserDetails/UserProfileImage`).on("value", function(getImg) {
	    			const getImgForAudio = getImg.val();
			    	audioImageUser.setAttribute("src", `${getImgForAudio}`);
	    		});

		    	audioSvgPath.setAttribute("d", `M20 19c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-3c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h2v3zM4 19v-4h2c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707v3c0 0.276-0.111 0.525-0.293 0.707s-0.431 0.293-0.707 0.293h-1c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707zM2 19c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-3c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-2v-1c0-2.209 0.894-4.208 2.343-5.657s3.448-2.343 5.657-2.343 4.208 0.894 5.657 2.343 2.343 3.448 2.343 5.657v1h-2c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v3c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h1c0.828 0 1.58-0.337 2.121-0.879s0.879-1.293 0.879-2.121v-7c0-2.761-1.12-5.263-2.929-7.071s-4.31-2.929-7.071-2.929-5.263 1.12-7.071 2.929-2.929 4.31-2.929 7.071v6z`);

		    	playPauseSvg.setAttribute('viewBox', '0 0 24 24');
		    	playPauseSvg.setAttribute('height', '20');
		    	playPauseSvg.setAttribute('width', '20');
		    	playPauseSvg.classList.add('audio-play-pause-svg');

		    	playPauseSvgPath.setAttribute("d", `${playSvgIcon}`);

		    	let toogleAudioState = function() {
		    		isplay ? mainAudioURL.pause():mainAudioURL.play();
		    		if (!isplay) {
		    			mainAudioURL.play();		    			
		    			playPauseSvgPath.setAttribute("d", `${pauseSvgIcon}`);
						
						let audioPlaying = setInterval(() => {
							mainAudioSeek.style.width = mainAudioURL.currentTime / mainAudioURL.duration * 100 + "%";
							currentTimeSpan.innerText = convertTime(mainAudioURL.currentTime);
						}, 500);
		    		} else{		    			mainAudioURL.pause();
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
		    		currentTimeSpan.innerText = `00:00`;
		    	});
		    	mainAudioURL.addEventListener("playing", ()=> isplay = true);
		    	mainAudioURL.addEventListener("pause", ()=> isplay = false);
		    	mainAudioURL.addEventListener("ended", function () {
		    		currentTimeSpan.innerText = '00:00';
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
				    const timeToSeek = seekEvt.offsetX / parseInt(timelineWidth) * mainAudioURL.duration;

				    mainAudioURL.currentTime = timeToSeek;
		    	});

		    }

		    //Check Valid Url

		    function validURL(str) {
		      let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
		      return !!pattern.test(str);
		    }

		    //If Database has Link

		    if(validURL(dbFetchMsg)) {
		   		let linkHold = document.createElement("div");
		    	let linkAnchor = document.createElement("div");

		    	linkHold.classList.add("link_hold");

		   		if(!dbFetch.ImageUrl){
					let data = {key: '1ab256542fce49dbedd2428c6e066973', q: dbFetchMsg}

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
					}).then(res => {
						if (res.status !==200) {
							linkFrame.src = 'https://archive.org/download/placeholder-image/placeholder-image.jpg';
						}
						return res.json();
					}).then(response => {
						linkText.innerHTML = response.description;
						if(response.image){
							linkFrame.setAttribute("loading", "lazy");
							linkFrame.src = response.image;
						} else{
							linkFrame.src = 'https://archive.org/download/placeholder-image/placeholder-image.jpg';
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

			    chtReplyBtn.addEventListener("click", function(rplyLinkEvt) {
			    	const linkAnchText = linkAnchor.innerText;

			        rplyDomElemId.value = dbFetchId;

			    	ReplyMessage("#1a8cff", linkAnchText, dbFetchUser);
			    });
		    } else{
		        //Simple Text Reply

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

		    chtMsgdate.innerText = dbFetchTime;

			chtMsgProf.appendChild(chtMsgdate);

		    usroptBtnCopy.appendChild(usroptBtnCopyIco);
		    usrOptBtnPin.appendChild(usrOptBtnPinIco);
		    usroptBtnSave.appendChild(usroptBtnSaveIco);

			chtusrOptDiv.appendChild(usrOptBtnPin);
			chtusrOptDiv.appendChild(usroptBtnCopy);
			chtusrOptDiv.appendChild(usroptBtnSave);
			chtusrOptH.appendChild(chtusrOptDiv);
			chtTxt.appendChild(chtusrOptH);
			
			chtTxt.appendChild(chtReplyBtn);

			if(!dbFetch.ImageUrl) chtTxt.appendChild(chtMainMsg);

			chtMsgCOnt.appendChild(chtTxt);

			chatMsg.appendChild(chtMsgProf);	
			chatMsg.appendChild(chtMsgCOnt);	

			chtAreaMsg.appendChild(chatMsg);

		    //Active class to chatTxt

		    chatMsg.addEventListener("click", addSelectClass);

		    //Database chat Options => Copy Text

		    usroptBtnCopy.addEventListener("click", function() {
		        navigator.clipboard.writeText(chtMainMsg.innerText);
		        showSnackNotification({icon: 'content_copy', notifAbout: 'Copied To ClipBoard'});
		        removeSelectClass();
		    });

		    //Database Chat Options => Pin Messages

		    usrOptBtnPin.addEventListener("click", function() {
		    	
		    	let getBgImgUrl = function() {
					const getStyle = chtarea.currentStyle || window.getComputedStyle(chtarea, false);
					const rtrnStyle = getStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

					return rtrnStyle;
		    	}

		    	const pinMsgId = Date.now();

	    		const pinImg =  usrImgUrl.getAttribute("data-src") || usrImgUrl.src;

	    		const userBgUrl = getBgImgUrl();
		    	if(dbFetchImage) {
			    	pinMessageDb.child(`${pinMsgId}`).set({
			    		PinMessage: dbFetchMsg,
			    		PinImageUrl: dbFetchImage,
			    		PinUserImg: pinImg,
			    		PinUserBgImg: getBgImgUrl(),
						PinByUser: dbFetchUser
			    	}).then(()=>{
			            showSnackNotification({icon: 'chat_bubble_outline', notifAbout: 'Message Pinned!'});
						const imgPinUniqueId = Date.now();
						const imgPinchangerInfo = `${usernameCookie} has Pinned Image in Group`;
						fetchChat.child(`${imgPinUniqueId}_contentInfo`).set({
							contentInfo: imgPinchangerInfo
						});
			    	});
		    	} else{
			    	pinMessageDb.child(`${pinMsgId}`).set({
			    		PinMessage: dbFetchMsg,
			    		PinUserImg: pinImg,
			    		PinUserBgImg: userBgUrl,
						PinByUser: dbFetchUser
			    	}).then(()=>{
						const pinUniqueId = Date.now();
						const pinchangerInfo = `${usernameCookie} has Pinned Some Text in Group`;
						fetchChat.child(`${pinUniqueId}_contentInfo`).set({
							contentInfo: pinchangerInfo
						});
			            showSnackNotification({icon: 'chat_bubble_outline', notifAbout: 'Message Pinned!'});
			    	});
		    	}
		    });

		    //Database chat Options => Save Messages
		    
		    usroptBtnSave.addEventListener("click", function() {
		        const msgUniqId = Date.now();
		        let saveCntentIcoChk = `<svg height="16" width="16" viewBox="0 0 24 24"><path fill="#fff" d="M18.419 21.814c0.161 0.116 0.363 0.186 0.581 0.186 0.552 0 1-0.448 1-1v-16c0-0.828-0.337-1.58-0.879-2.121s-1.293-0.879-2.121-0.879h-10c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v16c-0.001 0.199 0.060 0.404 0.186 0.581 0.321 0.449 0.946 0.554 1.395 0.232l6.419-4.584zM18 19.057l-5.419-3.871c-0.355-0.254-0.819-0.242-1.162 0l-5.419 3.871v-14.057c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h10c0.276 0 0.525 0.111 0.707 0.293s0.293 0.431 0.293 0.707z"></path></svg>`;
		        //Toogle Bookmarked Option and Functions
		        if (usroptBtnSaveIco.innerHTML === saveCntentIcoChk) {
		            //Saving Image from message
		            if (dbFetchImage) {
			            saveMsgGrp.child(`${msgUniqId}`).set({
			            	fromUser: dbFetchUser,
			            	savedMsg: dbFetchMsg,
			            	savedImgUrl: dbFetchImage,
			            	savedUsrTime: dbFetchTime,
			            	lastUpdate: `${msgUniqId}`
			            }).then(function() {
				            showSnackNotification({icon: 'star', notifAbout: 'Bubble Starred!'});
			            });
		            } else{
			            if (dbFetchRply) {
				            saveMsgGrp.child(`${msgUniqId}`).set({
				            	fromUser: dbFetchUser,
				            	savedMsg: dbFetchMsg,
				            	savedRplyStr: dbFetchRply,
				            	savedImgUrl: dbFetchImage,
				            	savedUsrTime: dbFetchTime,
				            	lastUpdate: `${msgUniqId}`
				            }).then(function() {
					            showSnackNotification({icon: 'star', notifAbout: 'Bubble Starred!'});
				            });	            	
			            } else {
	    	                //Saving Txt from message
	    		            saveMsgGrp.child(`${msgUniqId}`).set({
	    		            	fromUser: dbFetchUser,
	    		            	savedMsg: dbFetchMsg,
	    		            	savedUsrTime: dbFetchTime,
	    		            	lastUpdate: `${msgUniqId}`
	    		            }).then(function() {
	    			            showSnackNotification({icon: 'star', notifAbout: 'Bubble Starred!'});
	    		            });
						}
		            }
		        } else{
		            usroptBtnSaveIco.innerHTML = `<svg height="16" width="16" viewBox="0 0 20 28"><path fill="#fff" d="M18.188 2c0.234 0 0.469 0.047 0.688 0.141 0.688 0.266 1.125 0.906 1.125 1.609v20.141c0 0.703-0.438 1.344-1.125 1.609-0.219 0.094-0.453 0.125-0.688 0.125-0.484 0-0.938-0.172-1.297-0.5l-6.891-6.625-6.891 6.625c-0.359 0.328-0.812 0.516-1.297 0.516-0.234 0-0.469-0.047-0.688-0.141-0.688-0.266-1.125-0.906-1.125-1.609v-20.141c0-0.703 0.438-1.344 1.125-1.609 0.219-0.094 0.453-0.141 0.688-0.141h16.375z"></path></svg>`;
		            showSnackNotification({icon: 'star_outline', notifAbout: 'Bubble Unstarred!'});
		        }
		        removeSelectClass();
		    });


		    if (dbFetchMsg) lstMsg.innerHTML = dbFetchMsg;
		    else if(dbFetchImage) lastMsg.innerHTML = `<i class="material-icons">camera_alt</i> Image`;
		    else if(dbFetchAudio) lastMsg.innerHTML = `<i class="material-icons">volume_up</i> Audio`;

		    lstMsgtime.innerText = dbFetchTime;

		    let chatAppearAnimation = setTimeout(()=>{
				chatMsg.classList.add("appear");
		    	clearTimeout(chatAppearAnimation);
		    }, 250);

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

		    setTimeout(()=>{
				chtMsgForContent.classList.add("appear");
		    }, 250);
	    }
	});

	//Database Chat => Pin Messaages

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

		let	pinSlideDef = 1;

		let pinSlide = document.createElement("div");
		let pinnedMsg = document.createElement("div");

		let pinnedMsgFromUser = document.createElement("div");
		let pinnedUserName = document.createElement("span");
		let pinnedUserImg = document.createElement("img");

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
		pinnedUserImg.src = pinUserImg;
		lstPinMsg.innerHTML = pinMsg;

		pinSlide.style.backgroundImage = `url("${pinUserBgImg}")`;

		pinSlide.appendChild(pinnedMsg);
		pinnedMsgFromUser.appendChild(pinnedUserImg);
		pinnedMsgFromUser.appendChild(pinnedUserName);
		pinSlide.appendChild(pinnedMsgFromUser);
		mainPinDiv.appendChild(pinSlide);

		//SlideShow for Messages


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
}
