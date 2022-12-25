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
	//���o�����
	let seconds = Math.floor(time % 60),
	minutes = Math.floor(time / 60) % 60,
	hours = Math.floor(time / 3600);

	//�p�G�Ȥ֩�10�[0�b�}�l
	seconds = seconds < 10 ? `0${seconds}` : seconds;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
	hours = hours < 10 ? `0${hours}` : hours;

	if(hours ==0) {
		return `${minutes}:${seconds}`;
	}
	return `${hours}:${minutes}:${seconds}`;
}

mainVideo.addEventListener("timeupdate", e => {
	let{ currentTime, duration } = e.target; //���o�v���ɶ��b�M����
	let percent = (currentTime / duration) * 100; //���
	progressBar.style.width = `${percent}%`;  //�i�ױ��H��ҧe�{
	currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", e => {
	videoDuration.innerText = formatTime(e.target.duration);
})

videoTimeline.addEventListener("click", e => {
	let timelineWidth = videoTimeline.clientWidth; //�ɶ��b��
	mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration; //��s��e�ɶ�
});

volumeBtn.addEventListener("click", () => {
	if(!volumeBtn.classList.contains("fa-volume-high")) {//�p�G���q����
		mainVideo.volume = 0.5; //���q�w�]��0.5
		volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
	} else {
		mainVideo.volume = 0.0; //���q�w�]���R��
		volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
	}
	volumeSlider.value = mainVideo.video; //�ھڭ��q��s�ưʭ�
});

volumeSlider.addEventListener("input", e => {
	mainVideo.volume = e.target.value; //���q�ư�
	if(e.target.value == 0) { //�p�G���q0�A���R���ϥ�
		volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
	} else{
		volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
	}
});

speedBtn.addEventListener("click", () => {
	speedOptions.classList.toggle("show"); //�������
});

speedOptions.querySelectorAll("li").forEach(option => {
	option.addEventListener("click", () => { //�[�J���s�ƥ�
		mainVideo.playbackRate = option.dataset.speed; //�^�񪺼ƾڶ�
		speedOptions.querySelector(".active").classList.remove("active");
		option.classList.add("active"); //�W�[��������ﶵ�ƥ�
	});
});

document.addEventListener("click", e => { //���ót�׿ﶵ
	if(e.target.tagName !=="SPAN" || e.target.className !== "material-symbols-rounded") {
		speedOptions.classList.remove("show"); 
	}
});

picInPicBtn.addEventListener("click", () => {
	mainVideo.requestPictureInPicture();  //�����ܤl���e��
});

fullscreenBtn.addEventListener("click", () => {
	container.classList.toggle("fullscreen");
	if(document.fullscreenElement) { //���p�v���O���ù�
		fullscreenBtn.classList.replace("fa-compress", "fa-expand");
		return document.exitFullscreen(); //�h�X���ù�
	}
	fullscreenBtn.classList.replace("fa-expand", "fa-compress");
	container.requestFullscreen(); //�}���ù�
});

skipBackward.addEventListener("click", () => {
	mainVideo.currentTime -= 5;  //��h��e�v���ɶ���5��
});

skipForward.addEventListener("click", () => {
	mainVideo.currentTime += 5;  //�W�[��e�v���ɶ���5��
});

playPauseBtn.addEventListener("click", () => {
	//�p�G�v������A����ΰ���v��
	mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => { //�p�G�v���b���A�����ϥܰ���
	playPauseBtn.classList.replace("fa-play", "fa-pause");
});

mainVideo.addEventListener("pause", () => { //�p�G�v������A�����ϥܶ}�l
	playPauseBtn.classList.replace("fa-pause", "fa-play");
});

