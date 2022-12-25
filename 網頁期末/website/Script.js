const container = document.querySelector(".container"),
mainVideo = container.querySelector("video"),
videoTimeline  = container.querySelector(".video-timeline"),
progressBar  = container.querySelector(".progress-bar"),
volumeBtn = container.querySelector(".volume i"),
volumeSlider = container.querySelector(".left input"),
currentVidTime = container.querySelector(".current-time"),
videoDuration = container.querySelector(".video-duration"),
skipBackward = container.querySelector(".skip-backward i"),
skipForward = container.querySelector(".skip-forward i"),
playPauseBtn = container.querySelector(".play-pause i"),
speedBtn = container.querySelector(".playback-speed span"),
speedOptions = container.querySelector(".speed-options"),
picInPicBtn = container.querySelector(".pic-in-pic span"),
fullscreenBtn = container.querySelector(".fullscreen i");

const formatTime = time => {
	//取得秒分鐘
	let seconds = Math.floor(time % 60),
	minutes = Math.floor(time / 60) % 60,
	hours = Math.floor(time / 3600);

	//如果值少於10加0在開始
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	hours = hours < 10 ? `0${hours}` : hours;

	if(hours ==0) {
		return `${minutes}:${seconds}`;
	}
	return `${hours}:${minutes}:${seconds}`;
}

mainVideo.addEventListener("timeupdate", e => {
	let{ currentTime, duration } = e.target; //取得影片時間軸和長度
	let percent = (currentTime / duration) * 100; //比例
	progressBar.style.width = `${percent}%`;  //進度條以比例呈現
	currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", e => {
	videoDuration.innerText = formatTime(e.target.duration);
})

videoTimeline.addEventListener("click", e => {
	let timelineWidth = videoTimeline.clientWidth; //時間軸長
	mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; //更新當前時間
});

volumeBtn.addEventListener("click", () => {
	if(!volumeBtn.classList.contains("fa-volume-high")) {//如果音量不高
		mainVideo.volume = 0.5; //音量預設值0.5
		volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
	} else {
		mainVideo.volume = 0.0; //音量預設值靜音
		volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
	}
	volumeSlider.value = mainVideo.video; //根據音量更新滑動值
});

volumeSlider.addEventListener("input", e => {
	mainVideo.volume = e.target.value; //音量滑動
	if(e.target.value == 0) { //如果音量0，換靜音圖示
		volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
	} else{
		volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
	}
});

speedBtn.addEventListener("click", () => {
	speedOptions.classList.toggle("show"); //切換顯示
});

speedOptions.querySelectorAll("li").forEach(option => {
	option.addEventListener("click", () => { //加入按鈕事件
		mainVideo.playbackRate = option.dataset.speed; //回放的數據集
		speedOptions.querySelector(".active").classList.remove("active");
		option.classList.add("active"); //增加選取中的選項事件
	});
});

document.addEventListener("click", e => { //隱藏速度選項
	if(e.target.tagName !=="SPAN" || e.target.className !== "material-symbols-rounded") {
		speedOptions.classList.remove("show"); 
	}
});

picInPicBtn.addEventListener("click", () => {
	mainVideo.requestPictureInPicture();  //切換至子母畫面
});

fullscreenBtn.addEventListener("click", () => {
	container.classList.toggle("fullscreen");
	if(document.fullscreenElement) { //假如影片是全螢幕
		fullscreenBtn.classList.replace("fa-compress", "fa-expand");
		return document.exitFullscreen(); //退出全螢幕
	}
	fullscreenBtn.classList.replace("fa-expand", "fa-compress");
	container.requestFullscreen(); //開全螢幕
});

skipBackward.addEventListener("click", () => {
	mainVideo.currentTime -= 5;  //減去當前影片時間的5秒
});

skipForward.addEventListener("click", () => {
	mainVideo.currentTime += 5;  //增加當前影片時間的5秒
});

playPauseBtn.addEventListener("click", () => {
	//如果影片停止，播放或停止影片
	mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => { //如果影片在播，切換圖示停止
	playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => { //如果影片停止，切換圖示開始
	playPauseBtn.classList.replace("fa-pause", "fa-play");
});

