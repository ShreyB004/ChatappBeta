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

//All declaratoins
let chtarea = document.getElementById("chatArea");
let usrImgUrl = document.getElementById("photo");
let usrFallbackPic = document.getElementById("fallbackPhoto");

let saveMsgBtn = document.getElementById("saveMsgBtn");
let saveMsgCls = document.getElementById("saveMsgClose");

let mdlUsrShwBtn = document.getElementById("mdlShwBtn"); 
let mdlUsrsClsBtn = document.getElementById("mdlClsBtn");

let sidePnlBtn = document.getElementById("sidePanelBtn");
let clicked = 0;

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
let span = document.getElementsByClassName("close")[0];

let txtTggle = document.getElementById("textTgle");

let chtAreaMsg = document.getElementById("chtAreaMain");

let sendBtn = document.getElementById("sendMsg");
let msgInpt = document.getElementById("message");
let replyClr = document.getElementById("rplyClr");
let submit = document.getElementById("submit");

let imgUpload = document.getElementById("imageUpload");

let chtAreaTitle = document.getElementById("chatAreaTitle");

let grpBtnBack = document.getElementById("grpInfoBackBtn");
let grpEditBtn = document.getElementById("editGrpInfo");
let grpDescInpt = document.getElementById("editedGrpDesc");

let grpFileReader = document.getElementById("grpProfileUpload");
let grpProfilePic = document.getElementById("grpImage");
let grpEditOverlay = document.getElementById("editOverlay");

let clsImgMdl = document.getElementById("clsMdl");
let imgchtAttach = document.getElementById("attachment");

let userBioPrevw = document.getElementById("showUserBio");
let userNamePrevw = document.getElementById("showUserName");

let wrapper = document.getElementById("onlineState");
let offlineDiv = document.getElementById("offlineDiv")

let imgUsrName = document.getElementById("imageUserName");
let cUsrState = document.getElementById("currUsrState");

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
		snackBarShow({icon: 'wifi', infoTxt: 'Reconnecting...'});
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
  document.cookie = _cookieName + "=" + _cookieVal + ";" + expires + ";path=/";
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

(function() {
	//If User Cookie Already Exists
	if (_confirmCookie()) {
	  	userFormWrapper.remove();
	  	usernameCookie = _$fetchCookie("username");
	  	loadUserDatabase();
	} else{//If Cookie is deleted or doesn't exists => By CLick Event Set Cookie
		let authBg = document.getElementById("AuthBg");
		authBg.classList.add("no_Auth");
		authValdtbtn.addEventListener("click", function() {
			let userVal = logInusrName.value || signUpusrName.value;

			setCookie("username", userVal, 30);
			usernameCookie = _$fetchCookie("username");

			ValidateUser(userVal);
			loadUserDatabase();
		});
 	}
})();


//Authentication Functions => Change textCOntent of button from "Login" To "Signup"

function AuthBtnValueFn(stringVal, callCheckFn, stringToCheck) {
	//For Changing innerext only
    if (stringVal) {
        authValdtbtn.innerText = stringVal; 
    } else { // Check if Authenticate Button has value of login or signup
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
            setTimeout(() => {
                userFormWrapper.remove();
            }, 2500);
        });

    }

    //Check Existence of UserName in DataBase 

    dataBase.ref(`Collo Chat/Users Info`).get().then((usrExists) => {
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
mdlUsrShwBtn.addEventListener("click", function() {
	userModalVisibility(true);
});
mdlUsrsClsBtn.addEventListener("click", function() {
	userModalVisibility(false);
});
let eOp = document.getElementById("editOpen");
let eCls = document.getElementById("editCls");
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
	
	selectElem({Elemname: ".grid_img_hold img.bg_tags_imgs", ClassName: "bg_img_setted"});
	selectElem({Elemname: ".pill_btns", ClassName: "actvBgTag"});

})();

//CLIENT SIDE : Function Add Active Class Dynamically 

function selectElem({Elemname: elemN, ClassName: clsName, TimeOut: timeCs}) {   
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

function openBoard(wToogle) {
   if(wToogle) {
         msgInpt.focus();
    } else {
        msgInpt.blur();
    }
}

//CLIENT SIDE : Function Setting reply on Opened Board

function setReply(txtReply, usrFrmRply, imgReply) {
	let replyMainDiv = document.getElementById("rplyClsEn");
    let rplyUsrFrm = document.getElementById("rplyFrmUsr");
	let replySpnVar = document.getElementById("rplySpn");

    let rplyImageHolder = document.getElementById("replYImageDiv");
    let rplyImage = document.getElementById("repliedImage");

    rplyUsrFrm.innerText = usrFrmRply;

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
    
    openBoard(true);
}

//CLIENT SIDE : Function Snackbar Function to Notify Actions

function snackBarShow({icon: icn, infoTxt: infTxt}) {

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

//CLIENT SIDE : Function for Modal of Image

imgAttachBtn.addEventListener("click", function () {
    
    let imgSrcReset = document.getElementById("imageIsLoaded");
    let imgCaptReset = document.getElementById("captionTxt");

    imgSrcReset.src = '';
    imgCaptReset.innerText = '';

    modal.style.display = "block";

    document.getElementById('attachment').click();
    
    openBoard(true);
});

//CLIENT SIDE : Function Send Message on Enter Event

msgInpt.addEventListener("keydown", function(entEvt){
	
	if (msgInpt.innerText/*.trim()*/ !== '') {
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

//CLIENT SIDE : Function of Events TO Post 

sendBtn.addEventListener("click", SendMessage);

submit.addEventListener("click", SendImage);

//CLIENT SIDE : Function of Clear reply By Event onclick 

replyClr.addEventListener("click", function(){
	setReply('', '', '');
});


// CLIENT SIDE : Function of Optimizing Performance by compressing Img

let compressImg = {
    compress: function(imgSrc, imgQuality, outputFormat) {
        let compImgType = "image/jpeg";

        "undefined" != typeof outputFormat && "png" == outputFormat && (compImgType = "image/png");

        let canvasDraw = document.createElement("canvas");
        let imgRtrn = new Image;
        
        canvasDraw.width = imgSrc.naturalWidth;
        canvasDraw.height = imgSrc.naturalHeight;

        let drawnImg = (canvasDraw.getContext("2d").drawImage(imgSrc, 0, 0), canvasDraw.toDataURL(compImgType, imgQuality / 100));

        return imgRtrn.src = drawnImg, imgRtrn
    }
};

//Database Functions => UserDetails

function loadUsrInformation() {
	const dbUsrsAbout = dataBase.ref(`Collo Chat/Users Info/${usernameCookie}/UserDetails`);

	let usrAboutStats = document.getElementById("usrAbout");
	let usrImgfile = document.getElementById("usrImgByFile");

    //User Status Update or Set

	usrAboutStats.addEventListener("keyup", (evtUsrSts) => {
		
        if (evtUsrSts.code === 'Enter') {
			dbUsrsAbout.update({UserBio: usrAboutStats.value});
			usrAboutStats.blur();
		}

	});

    //User Profile Pic Change

	imgUpload.addEventListener("change", function(fileEvt) {
	    let oneFile = fileEvt.target.files[0];
	    let fileRead = new FileReader();

	    let imgRef = cldStorage.ref(`${usernameCookie}/${usernameCookie}_Profile`);
	    let userPrfImg = imgRef.put(oneFile, {contentType: oneFile.type});

	    userPrfImg.then(function(usrImgSnp) {
	    	usrImgSnp.ref.getDownloadURL().then((url) => {
	    		dbUsrsAbout.update({UserProfileImage: url});
	    	});
	    });
	});

    //Setting Profile Pic from Database

    let loadLazily = setTimeout(function() {
		dbUsrsAbout.once('value', () => {
			lazyLoadImg('lazy_load', 'img_loaded');
			lazyLoadImg('lazy_load_cdn', 'img_loaded_cdn');	
		});
		clearTimeout(loadLazily);
    }, 2500);

	dbUsrsAbout.on('value', (usrAbtSnp) => {
		let usrDetailsSnp = usrAbtSnp.val();

		let usrStatusExits = usrAbtSnp.child('UserBio').exists();
		let userProfilePicExists = usrAbtSnp.child('UserProfileImage').exists();
		
		let editImage = document.getElementById("editImage");

		userNamePrevw.innerText = usernameCookie;
		imgUsrName.innerText = usernameCookie;

        if (usrStatusExits) {
        	usrAboutStats.value = usrDetailsSnp.UserBio;
        	userBioPrevw.innerText = usrDetailsSnp.UserBio;
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
	let chtClr = 'Themeblue';

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
            chtarea.style.backgroundImage = `url(${themeSnap.ChatBackground})`;
        }

        //Set Chat Theme From Database

		if (dbBoolchtThemeExsits) {
            let chtTheme = themeSnap.ChatTheme;
			document.body.setAttribute("data-theme", chtTheme);
			clrThemes.forEach((clrsDB) => {
				clrsDB.classList.remove("selected");
			});

			if (chtTheme === 'Themeblue') clrThemes[0].classList.add("selected");
			else if (chtTheme === 'Themepurple') clrThemes[1].classList.add("selected");
			else if (chtTheme === 'Themegreen') clrThemes[2].classList.add("selected");
			else if (chtTheme === 'Themeorange') clrThemes[3].classList.add("selected");
			else if (chtTheme === 'Themepink') clrThemes[4].classList.add("selected");
			else if (chtTheme === 'ThemeskyBlue') clrThemes[5].classList.add("selected");
			else if (chtTheme === 'Themelightred') clrThemes[6].classList.add("selected");
			else if (chtTheme === 'Themelightgreen') clrThemes[7].classList.add("selected");
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
	    
	    userStatusRef.onDisconnect().update({
		   Status: `Last Seen at ${usrLastHrs}:${usrLastMins}`
	    });

	});	
}

//Database Functions => RealTime All Users Presence States  

(function() {
	const allUserStatus = dataBase.ref("Collo Chat/Users Info");
    
    let memberOnline = document.getElementById("MemOnline");

	allUserStatus.on("value", function(usrStatus) {
		//Resetting array

	    let memOnlineArr = [];
	    let memOnlineNum = 0;

		let allusrArr =  usrStatus.val();

		let staticMemPresence = document.getElementsByClassName("member_about_details");
		let staticMemPresenceLen = staticMemPresence.length;

	    let allUsrs = Object.keys(usrStatus.val());

	    for (let i = 0; i < staticMemPresenceLen; ++i) {
			
			let staticMemList = staticMemPresence[i].parentElement.parentElement.getElementsByClassName("member_list_sections")[0];
			let staticMemImg = staticMemList.getElementsByClassName("member_img_holder")[0];

			memOnlineArr.push(allusrArr[allUsrs[i]].Presence.Status);
				
			if (allusrArr[allUsrs[i]].Presence.Status === 'Online') memOnlineNum = (++memOnlineNum);

			if (memOnlineNum > 1) memberOnline.innerText = memOnlineNum - 1;
			else memberOnline.innerText = `No one is `;

	    	staticMemPresence[i].innerText = memOnlineArr[i];

	    	if (staticMemPresence[i].innerText === 'Online') {
	    		staticMemPresence[i].classList.add("online_mem_spn");
	    		// staticMemImg.add("online_mem");
	    	} /*else staticMemImg.remove("online_mem");*/
	    }
	});
})();

//Database Functions => Default Online Members

function getOnlineUsers() {
	const applicationUsersdb = dataBase.ref("Collo Chat/Users Info");
	applicationUsersdb.once('value', (userOnline) => {
		let dbFetchOnline = userOnline.val();
		  
        let totalMembers = Object.keys(dbFetchOnline);

        let memOnlineCnt = 0;

        //Fetching Object Keys for "For Loop"

        let memberNumber = document.getElementById("MemNum");
	    let onceMemberOnline = document.getElementById("MemOnline");

        memberNumber.innerText = `${totalMembers.length}`;

        for (let i = 0; i < totalMembers.length; ++i) {
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
	    // let userchtBgImg = [];
	    
	    let userPresence = [];


        for (let i = 0; i < usrWebLen; ++i) {
			let users = usrWeb[i];

			let membersListH = document.getElementById("membersListHolder");

			let mainListHold = document.createElement("div");
			let memListsecImg = document.createElement("div");
			let memImgHold = document.createElement("div");
			let memImg = document.createElement("img");

			let memListsecDetails = document.createElement("div");
			let memNameHolder = document.createElement("span");
			let memAbout = document.createElement("span");

			mainListHold.classList.add("members_list");
			memListsecImg.classList.add("member_list_sections");
			memImgHold.classList.add("member_img_holder");
			memImg.classList.add("member_image");
			
			memListsecDetails.classList.add("member_list_sections");
			memNameHolder.classList.add("member_name_holder");
			memNameHolder.classList.add("member_detail_blcks");
			memAbout.classList.add("member_about_details");
			memAbout.classList.add("member_detail_blcks");

            //Check Existence and Push Values in array

			if(usersSnaps.child(`${users}/UserDetails/UserProfileImage`).exists()) userImgUrlArr.push(dbFetchKeys[users].UserDetails.UserProfileImage);
			else userImgUrlArr.push('https://icons.iconarchive.com/icons/papirus-team/papirus-status/256/avatar-default-icon.png');
			
/*			if(usersSnaps.child(`${users}/UserSettings/ChatBackground`).exists()) userchtBgImg.push(dbFetchKeys[users].UserSettings.ChatBackground);
			else userchtBgImg.push('https://blog.tubikstudio.com/wp-content/uploads/2020/04/Pennine-Alps-illustration-tubikarts-1024x768.png');*/

			if(usersSnaps.child(`${users}/Presence`).exists()) userPresence.push(dbFetchKeys[users].Presence.Status);
			else userPresence.push("Last Seen Recently");

			memAbout.innerText = userPresence[i];

			if (memAbout.innerText === 'Online') {
				memAbout.classList.add("online_mem_spn");
				// memImgHold.classList.add("online_mem");
			} /*else{
				if(memImgHold.classList.contains("online_mem")) memImgHold.classList.remove("online_mem");
				if(memImgHold.classList.contains("online_mem_spn")) memImgHold.classList.remove("online_mem_spn");
			}*/

			if(usrWeb[i] === usernameCookie) memNameHolder.innerText = 'Me';
			else memNameHolder.innerText = usrWeb[i];

			memImg.setAttribute("loading", "lazy");
			
			memImg.setAttribute("src", userImgUrlArr[i]);
			// mainListHold.style.backgroundImage = `url(${userchtBgImg[i]})`;

			memImgHold.appendChild(memImg);
			memListsecImg.appendChild(memImgHold);

			memListsecDetails.appendChild(memNameHolder);
			memListsecDetails.appendChild(memAbout);

			mainListHold.appendChild(memListsecImg);
			mainListHold.appendChild(memListsecDetails);

			membersListH.appendChild(mainListHold);
		}
	});
}

//Function Event of Side panel where members are visible
function groupPanel() {
	let sidePnl = document.getElementById("sidePanel");
	sidePnl.classList.toggle("show_panel");
}
function fetchMemOnce(){
	getMembersLists();
	chtAreaTitle.removeEventListener("mouseover", fetchMemOnce);
}

sidePnlBtn.addEventListener("click", groupPanel);
grpBtnBack.addEventListener("click", groupPanel);

chtAreaTitle.addEventListener("mouseover", fetchMemOnce);


//Database Chat => Getting Time

function userPostTime() {
	let chtDate = new Date();
	
    let chtHrs = chtDate.getHours();
	let chtMins = chtDate.getMinutes();

	let chtMinsTern = (chtMins<10?"0":"")+chtMins;
    let parseHr = parseInt(chtHrs);

    if (parseHr > 12) parseHr = parseHr - 12;
	
	let parseHrTern = (parseHr<10?"0":"")+parseHr;

    let meredian = (chtHrs<=11?"am":"pm");

	let timeStr = `${parseHrTern.toString()} : ${chtMinsTern} ${meredian}`;

	return timeStr;
}

//Database Chat => After Posting Functions

function afterPostFunctions() {
    msgInpt.innerText = '';
    setReply('', '', '');
    chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;
}

//Database Chat => Set Unique Id TO Each Chat Bubble

function setmsgUniqueId(){
    let msgDatId = Date.now();
    return msgDatId;
}

//Database Chat => Posting text chat in Group Chats Child

function SendMessage() {
    let rplSpn = document.getElementById("rplySpn");
    let rplyDbFromUsr = document.getElementById("rplyFrmUsr");

    let rplyChkDb = rplSpn.innerHTML?rplSpn.innerHTML:"";
    let rplyFrmUsrChk  = rplyDbFromUsr.innerText?rplyDbFromUsr.innerText:"";

    let rplImage = document.getElementById("repliedImage").src;
    let rplyImageChk = rplImage?rplImage:"";
  
    let getUniqueIdDb = setmsgUniqueId();
    let getUniqueIdDbStr = getUniqueIdDb.toString();
  
    let usrPostTimeDb = userPostTime();

    let dbRef = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdDb}`);

    let msgInptVal = msgInpt.innerHTML;
  
    if(rplyFrmUsrChk){
		if(rplyImageChk) {
		    dbRef.set({
		        usr: usernameCookie,
		        msg: msgInptVal,
				replyStr: rplyChkDb,
				replyImage: rplyImageChk,
				replyOfUser: rplyFrmUsrChk,
		        usrTime: usrPostTimeDb,
		        chgId: getUniqueIdDbStr
		    });
		} else{
		    dbRef.set({
		        usr: usernameCookie,
		        msg: msgInptVal,
				replyStr: rplyChkDb,
				replyImage: "",
				replyOfUser: rplyFrmUsrChk,
		        usrTime: usrPostTimeDb,
		        chgId: getUniqueIdDbStr
		    });
		}
    }  else {
	    dbRef.set({
	        usr: usernameCookie,
	        msg: msgInptVal,
	        usrTime: usrPostTimeDb,
	        chgId: getUniqueIdDbStr
	    });
    }

    afterPostFunctions();
}

//Database Chat => Posting Image in Group Chats child

function SendImage(){
  let getImgCht =  document.getElementById("imageIsLoaded");
  let getImgSrcCht = getImgCht.src;
  
  if (getImgSrcCht!=="") {
	  let imgrplSpn = document.getElementById("rplySpn");
	  let imgrplDb = imgrplSpn.innerText?imgrplSpn.innerText:"";
	  
	  let captTxt = document.getElementById("captionTxt");
	  let captTxtVal = captTxt.value;
	  
	  let getUniqueIdforImg = setmsgUniqueId();

	  let dbRefImg = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdforImg}`);

	   dbRefImg.set({
	          usr: usernameCookie,
	          replyStr: imgrplDb,
	          ImgUrl: getImgSrcCht,
	          msg: captTxtVal,
	          usrTime: userPostTime(),
	          chgId: getUniqueIdforImg.toString()
	      });

	      afterPostFunctions();
  }
  document.getElementById('myModal').style.display = 'none';
  submit.setAttribute("disabled", "true");
}


//Database Chat => File Handling!
let filenameSpn = document.getElementById("fileName");

imgchtAttach.addEventListener("change", function(chtMsgEvt) {
	
	let	uploadImgFile = chtMsgEvt.target.files[0];
	
	let mainImgAtch = document.getElementById("mainImgAttach");

	filenameSpn.innerText = uploadImgFile.name;

	let uploadTask = cldStorage.ref(`chatMessagesImgs/${uploadImgFile.name}`);

	uploadTask.put(uploadImgFile, {contentType: uploadImgFile.type}).then((ImgSnp) => {
		ImgSnp.ref.getDownloadURL().then((cldImgUrl) => {
			let imgSrcSet = document.getElementById('imageIsLoaded');
			imgSrcSet.setAttribute("src", `${cldImgUrl}`);
			submit.removeAttribute("disabled");
		});
	});

});

//Database Chat => Events to avoid unnessesary bugs and errors 

imgchtAttach.addEventListener("focus", function() {
	submit.setAttribute("disabled", "true");
});

clsImgMdl.addEventListener("click", function() {
      document.getElementById('myModal').style.display = 'none';
      filenameSpn.innerText = "File Name";
});


//Database Chat => Posting audio in Group Chats child

/*function sendchtAudio() {
  let getImgCht =  document.getElementById("imageIsLoaded");
  let getImgSrcCht = getImgCht.src;
  
  let imgrplSpn = document.getElementById("rplySpn");
  let imgrplDb = imgrplSpn.innerText?imgrplSpn.innerText:"";
  
  let captTxt = document.getElementById("captionTxt");
  let captTxtVal = captTxt.value;
  
  let getUniqueIdforImg = setmsgUniqueId();

  let dbRefImg = dataBase.ref(`Collo Chat/Web Developers/Group Chats/${getUniqueIdforImg}`);

   dbRefImg.set({
      usr: usernameCookie,
      replyStr: imgrplDb,
      ImgUrl: getImgSrcCht,
      msg: captTxtVal,
      usrTime: userPostTime(),
      chgId: getUniqueIdforImg.toString()
  });

  afterPostFunctions();
  document.getElementById('myModal').style.display = 'none';
}*/


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
			let changerInfo = `${usernameCookie} has Changed Group Description`;
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
	    let grpFile = grpPicChg.target.files[0];
	    let fileRead = new FileReader();

	    let grpPic = cldStorage.ref(`Web Developers/Profile_pic`);
	    let grpPrfImg = grpPic.put(grpFile, {contentType: grpFile.type});

	    grpPrfImg.then(function(grpImgSnp) {
	    	grpImgSnp.ref.getDownloadURL().then((url) => {
	    		grpDb.update({GroupImg: url}).then(() => {
					let uniquegrpImgId = Date.now();
					let imgChangerInfo = `${usernameCookie} has Changed Group Profile Pic`;
					fetchChat.child(`${uniquegrpImgId}_contentInfo`).set({
						contentInfo: imgChangerInfo
					});
	    		});
	    	});
	    });
	});

	grpDb.on("value", function (grpInfo) {
		let getGrpInfo = grpInfo.val();
		let getGrpDesc = getGrpInfo.GroupDesc;

		let grpImages = document.getElementsByClassName("$groupImg");
		let grpImagesLen = grpImages.length;

		for (let i = 0; i < grpImagesLen; ++i) {
			grpImages[i].src = getGrpInfo.GroupImg;
		}

		grpDescInpt.innerText = getGrpDesc;
	});

	//Database Function => After Child is Removed
	
	fetchChat.on("child_removed", function(delSnpVal) {
		const dbDeleteMsg = delSnpVal.val();
		const dbDeleteMsgId = dbDeleteMsg.chgId;

		let rmvelem = document.getElementById(`${dbDeleteMsgId}`);
		rmvelem.parentElement.parentElement.parentElement.remove();
	});

	//Database Function => After Child is Edited

	fetchChat.on("child_changed", function(chngChildSnp) {
		let chngChildVal = chngChildSnp.val();
		let chngChildId = chngChildVal.chgId;
		let chngChildMsg = chngChildVal.msg;

		let chngElem = document.getElementById(chngChildId);
		chngElem.innerText = chngChildMsg;
	});

	//Database Function => After Child is Added

	fetchChat.on("child_added", function (dbChatSnp) {
	    let dbFetch = dbChatSnp.val();

	    if (!dbFetch.contentInfo) {
			let dbFetchMsg = dbFetch.msg;
		    let dbFetchTime = dbFetch.usrTime;
		    let dbFetchUser = dbFetch.usr;
		    let dbFetchId = dbFetch.chgId;
		    let dbFetchRply = dbFetch.replyStr;
		    let dbFetchRplyImage = dbFetch.replyImage;

		    //Confirming User By Cookie

		    let getCookieDb = _$fetchCookie("username");

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
		    usroptBtnSaveIco.classList.add("material-icons");

			chtTxt.classList.add("chat-msg-text");
		    chtMainMsg.classList.add("usr_main_msg");

		    chtMainMsg.setAttribute(`id`, `${dbFetch.chgId}`);

			function fnReply(evtFn, elemTxt) {
				evtFn.stopPropagation();
				evtFn.preventDefault();

				setReply(elemTxt);

		    	let clsReplySet = setTimeout(function() {
		    		chatMsg.classList.remove("replyingCurr");
		    	}, 500);
		    	chatMsg.classList.add("replyingCurr");
		        openBoard(false);
			}
		    function selectRmvs() {
		        let rmvChild = document.getElementsByClassName("chat-msg-text");
		        let rmvChildLen = rmvChild.length;
		        for (let i = 0; i < rmvChildLen; ++i) {
		            rmvChild[i].classList.remove("one_select");
		        }
		    }
		    function selectEvent() {
		        selectElem({
		        	Elemname: '.chat-msg-text', 
		        	ClassName: 'one_select', 
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

		        usroptBtnEditIco.innerText = 'brush';
			    usroptBtnDelIco.innerText = 'remove_circle_outline';

			    chtMsgStatus.innerText = 'done_all';

			    usroptBtnDel.appendChild(usroptBtnDelIco);
				chtusrOptDiv.appendChild(usroptBtnDel);

		        usroptBtnEdit.appendChild(usroptBtnEditIco);
		        chtusrOptDiv.appendChild(usroptBtnEdit);


				chtMsgProf.appendChild(chtMsgStatus);
		        
		        //Edit Message Trigger
		        usroptBtnEdit.addEventListener("click", function() {
		            let grandParentELemtxt = this.parentElement.parentElement;
		            grandParentELemtxt.removeEventListener("click", selectEvent);

		            chtMainMsg.setAttribute('contentEditable', 'true');
		            chtMainMsg.focus();
		            
		            grandParentELemtxt.classList.add("focused");
		            selectRmvs();

		            if (dbFetch.ImgUrl) {
		            	if (!dbFetchMsg) {
		            		chtMainMsg.style.display = 'inline-block';
		            	}
		            }
		            
		            chtTxt.addEventListener("click", function() {
		                if (this.classList.contains("one_select")) this.classList.remove("one_select");
		            });
		        });

		        //Database chat Options => Remove Message

				usroptBtnDel.addEventListener("click", function() {
					let rmvElemId = chtMainMsg.getAttribute("id");

					fetchChat.child(`${rmvElemId}`).remove().then(function() {
				        snackBarShow({icon: 'delete_forever', infoTxt: 'Bubble Deleted!'});
				    }).catch(function() {
				    	snackBarShow({icon: 'clear', infoTxt: 'Cannot Delete Bubble'})
				    });

				});

		        //KeyDown Event => Editing Chat message
		  	    chtMainMsg.addEventListener("keydown", function(entAttr) {
		  	        if ((entAttr.key === 'Enter')&&(!entAttr.shiftKey)) {
		  	            
		                entAttr.preventDefault();
		  	            
		                let dataVId = this.getAttribute("id");
		  	            let datavIdConn = fetchChat.child(`${dataVId}`);
		  	            let inrTxt = this.innerText;

		  	            datavIdConn.update({msg: `${inrTxt}`}).then(function() {
		  	                snackBarShow({icon: 'brush', infoTxt: 'Edited Sucessfully!'});
		  	                
		  	                chtMainMsg.removeAttribute("contentEditable");
		  	                chtMainMsg.parentElement.classList.remove("focused");

		  	                if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal; 
		  	                chtMainMsg.parentElement.addEventListener("click", selectEvent);

		  	            });
		  	        }
		  	    });

		        //Focus Lost Event
		        chtMainMsg.addEventListener("blur", function() {
		            if (!chtMainMsg.innerText) chtMainMsg.innerText = msgOrininalVal;


		            this.removeAttribute("contentEditable");
		            this.parentElement.classList.remove("focused");

		            this.parentElement.addEventListener("click", selectEvent);
		        });

		    } else{

		        //other Users Messages

		        let chtMsgUsrName = document.createElement("div");

		        chtMsgUsrName.classList.add("chat-msg-user");

		        chatMsg.classList.add("otherU");

		        chtTxt.appendChild(chtMsgUsrName);
		        
		        chtMsgUsrName.innerText = dbFetchUser;
			    if (dbFetch.ImgUrl) {
			    	if (!chtMainMsg.innerText) chtMainMsg.style.display = 'none';
			    }
		    }

		    //For all Users Functions


		    //if Dataase Has Reply Message

		    if (dbFetchRply) {
				let scpdDbRplyStr = dbFetch.replyStr;
				let rplyDiv = document.createElement("div");
				let rplyDivUser = document.createElement("span");
				let rplyDivSpn = document.createElement("span");

				rplyDiv.classList.add("reply_db");
				
		        rplyDivUser.classList.add("reply_spns");
				rplyDivUser.classList.add("reply_db_user");

				rplyDivSpn.classList.add("reply_spns");
				rplyDivSpn.classList.add("reply_db_spn");

		        //If database reply also contains Image

		        if (dbFetchRplyImage !== "") {

		            let rplyImageH = document.createElement("div");
		            let rplyImage = document.createElement("img");

		            rplyImageH.classList.add("reply_db_image_holder");
		            rplyImage.classList.add("reply_db_image");

		            rplyImage.src = dbFetchRplyImage;

		            rplyImageH.appendChild(rplyImage);
		            rplyDiv.appendChild(rplyImageH);
		        }

		        //From User's Message

		        rplyDivUser.innerText = dbFetch.replyOfUser;

		        //User Replied Message

				rplyDivSpn.innerHTML = scpdDbRplyStr;

				rplyDiv.appendChild(rplyDivUser);
				rplyDiv.appendChild(rplyDivSpn);
				chtTxt.appendChild(rplyDiv);
		    }

		    //If Chat message Has Image

		    if (dbFetch.ImgUrl) {
		    	let imgHolder = document.createElement("div");
		    	let imgTag = document.createElement("img");

		    	imgHolder.classList.add("cht_img_holder");
		    	chtTxt.classList.add("is_img");

		        //Lazy Load to optimize 

		        // dataBase.ref("Collo Chat/Group Chats").once("value", function() {
		    	imgTag.setAttribute("loading", "lazy");
			    	
		    	imgTag.setAttribute("src", dbFetch.ImgUrl);
		        // });

		    	imgHolder.appendChild(imgTag);
		    	chtTxt.appendChild(imgHolder);

		    	if (!dbFetchMsg) chtMainMsg.style.display = 'none';
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
			   	let scpdDbMsg = dbFetch.msg;
		   		let linkHold = document.createElement("div");
		    	let linkAnchor = document.createElement("div");

		    	linkHold.classList.add("link_hold");

		   		if(!dbFetch.ImgUrl){
					let data = {key: '1ab256542fce49dbedd2428c6e066973', q: scpdDbMsg}

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
			    	let rplyLinkevtVr = rplyLinkEvt;
			    	fnReply(rplyLinkevtVr, linkAnchor.innerText, dbFetchUser);
			    });
		    } else{

		        //Simple Text Reply

			    chtMainMsg.innerHTML = dbFetchMsg;
			    chtReplyBtn.addEventListener("click", function(rplyEvt) {
			    	let rplyEvtVar = rplyEvt;
			    	fnReply(rplyEvtVar, chtMainMsg.innerText, dbFetchUser);
			    });
		    }

			chtReplyBtn.innerText = 'reply';

		    usroptBtnCopyIco.innerText = 'content_copy';
			
		    usrOptBtnPinIco.innerText = 'star_border';
			
		    usroptBtnSaveIco.innerText = 'bookmark_outline';

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

			chtTxt.appendChild(chtMainMsg);

			chtMsgCOnt.appendChild(chtTxt);

			chatMsg.appendChild(chtMsgProf);	
			chatMsg.appendChild(chtMsgCOnt);	

			chtAreaMsg.appendChild(chatMsg);

		    //Active class to chatTxt

		    chtTxt.addEventListener("click", function(mseEvt) {
		        // mseEvt.preventDefault();
		        selectEvent();
		    });

		    //Set Reply By Double Clicking on Board

		    chatMsg.addEventListener("dblclick", function() {
		    	let chtMsgInnerTxtGet = chtMainMsg.innerText;
		        let chtMsgUsr = dbFetchUser;
		    	
		        let clsReplyChtMsg = setTimeout(function() {
		    		chatMsg.classList.remove("replyingCurr");
		    		clearInterval(clsReplyChtMsg);
		    	}, 1000);
		    	    	
		        chatMsg.classList.add("replyingCurr");
		    	
		        openBoard(false);

		        if (dbFetch.ImgUrl) {
		            let imageIcon = `<i class="material-icons">camera_alt</i> Image`;
		            setReply(imageIcon, chtMsgUsr, dbFetch.ImgUrl);
		        } else if(validURL(dbFetchMsg)){
		        	setReply(chtMainMsg.getElementsByClassName("link_hold")[0].getElementsByClassName("link_text")[0].innerText, chtMsgUsr);
		        } else{
		            setReply(chtMsgInnerTxtGet, chtMsgUsr);
		        }
		    });

		    //Database chat Options => Copy Text

		    usroptBtnCopy.addEventListener("click", function() {
		        navigator.clipboard.writeText(chtMainMsg.innerText);
		        snackBarShow({icon: 'content_copy', infoTxt: 'Copied To ClipBoard'});
		        selectRmvs();
		    });

		    //Database Chat Options => Pin Messages

		    usrOptBtnPin.addEventListener("click", function() {
		    	function getBgImgUrl() {
					let getStyle = chtarea.currentStyle || window.getComputedStyle(chtarea, false);
					let rtrnStyle = getStyle.backgroundImage.slice(4, -1).replace(/"/g, "");

					return rtrnStyle;
		    	}

		    	let pinMsgId = Date.now();
		    	if(dbFetch.ImgUrl) {
			    	pinMessageDb.child(`${pinMsgId}`).set({
			    		PinMessage: dbFetchMsg,
			    		PinImageUrl: dbFetch.ImgUrl,
			    		PinUserImg: usrImgUrl.getAttribute("data-src") || usrImgUrl.src,
			    		PinUserBgImg: getBgImgUrl(),
						PinByUser: dbFetchUser
			    	}).then(()=>{
			            snackBarShow({icon: 'chat_bubble_outline', infoTxt: 'Message Pinned!'});
						let imgPinUniqueId = Date.now();
						let imgPinchangerInfo = `${usernameCookie} has Pinned Image in Group`;
						fetchChat.child(`${imgPinUniqueId}_contentInfo`).set({
							contentInfo: imgPinchangerInfo
						});
			    	});
		    	} else{
			    	pinMessageDb.child(`${pinMsgId}`).set({
			    		PinMessage: dbFetchMsg,
			    		PinUserImg: usrImgUrl.getAttribute("data-src") || usrImgUrl.src,
			    		PinUserBgImg: getBgImgUrl(),
						PinByUser: dbFetchUser
			    	}).then(()=>{
			            snackBarShow({icon: 'chat_bubble_outline', infoTxt: 'Message Pinned!'});
						let pinUniqueId = Date.now();
						let pinchangerInfo = `${usernameCookie} has Pinned Some Text in Group`;
						fetchChat.child(`${pinUniqueId}_contentInfo`).set({
							contentInfo: pinchangerInfo
						});
			    	});
		    	}
		    });

		    //Database chat Options => Save Messages
		    
		    usroptBtnSave.addEventListener("click", function() {
		        let msgUniqId = Date.now();
		        //Toogle Bookmarked Option and Functions
		        if (usroptBtnSaveIco.innerText === 'bookmark_outline') {
		            usroptBtnSaveIco.innerText = 'bookmark';
		            //Saving Image from message
		            if (dbFetch.ImgUrl) {
			            saveMsgGrp.child(`${msgUniqId}`).set({
			            	fromUser: dbFetchUser,
			            	savedMsg: dbFetchMsg,
			            	// savedRplyStr: dbFetchRply,
			            	savedImgUrl: dbFetch.ImgUrl,
			            	savedUsrTime: dbFetchTime,
			            	lastUpdate: `${msgUniqId}`
			            }).then(function() {
				            snackBarShow({icon: 'star', infoTxt: 'Bubble Starred!'});
			            });
		            } else{
			            if (dbFetchRply) {
				            saveMsgGrp.child(`${msgUniqId}`).set({
				            	fromUser: dbFetchUser,
				            	savedMsg: dbFetchMsg,
				            	savedRplyStr: dbFetchRply,
				            	savedImgUrl: dbFetch.ImgUrl,
				            	savedUsrTime: dbFetchTime,
				            	lastUpdate: `${msgUniqId}`
				            }).then(function() {
					            snackBarShow({icon: 'star', infoTxt: 'Bubble Starred!'});
				            });	            	
			            } else {
	    	                //Saving Txt from message
	    		            saveMsgGrp.child(`${msgUniqId}`).set({
	    		            	fromUser: dbFetchUser,
	    		            	savedMsg: dbFetchMsg,
	    		            	savedUsrTime: dbFetchTime,
	    		            	lastUpdate: `${msgUniqId}`
	    		            }).then(function() {
	    			            snackBarShow({icon: 'star', infoTxt: 'Bubble Starred!'});
	    		            });
						}
		            }
		        } else{
		            usroptBtnSaveIco.innerText = 'bookmark_outline';
		            snackBarShow({icon: 'star_outline', infoTxt: 'Bubble Unstarred!'});
		        }
		        selectRmvs();
		    });


		    lstMsg.innerHTML = dbFetchMsg;
		    lstMsgtime.innerText = dbFetchTime;

		    setTimeout(()=>{
				chatMsg.classList.add("appear");
		    }, 250);

			chtAreaMsg.scrollTop = chtAreaMsg.scrollHeight;
	    } else {
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

		let pinMsg = pinMsgSnpVal.PinMessage;
		let pinUserName = pinMsgSnpVal.PinByUser;
		let pinUserImg = pinMsgSnpVal.PinUserImg;
		let pinUserBgImg = pinMsgSnpVal.PinUserBgImg;

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

		let savedMsgVal = dbGrpsavedMsg.val();

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
				snackBarShow({icon: 'bookmark_outline', infoTxt: 'Bubble Unstarred!'});
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
		let rmvSnpVal = rmvSMsgSnp.val();
		let lstUpdateMsg = rmvSnpVal.lastUpdate;
		let rmvMsgId = document.getElementById(`${lstUpdateMsg}`);
		rmvMsgId.remove();
	});
}
