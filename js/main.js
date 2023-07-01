const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
const badgeEl = document.querySelector("header .badges");
const fadeEls = document.querySelectorAll(".visual .fade-in");
const promotionEl = document.querySelector(".promotion");
const promotionToggleBtn = document.querySelector(".toggle-promotion");
const spyEls = document.querySelectorAll("section.scroll-spy");
const toTopEl = document.querySelector("#to-top");

let isHidePromotion = false;

// window.addEventListener("scroll", _.throttle(function(){
//   console.log("scroll");
// },300)); 이거랑 아래랑 같은거 / handleScrollLodash으로 함수를 분리 시킴

// =================== start: gsap =================== //
const handleScrollLodash = () => {
  // console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기~
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: "none",
    });
    //버튼 보이기!
    gsap.to(toTopEl, 0.2, {
      x: 0, //x축으로 얼마나 이동할지
    });
  } else {
    // 배지 보이기~
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: "block",
    });
    // 버튼 숨기기!
    gsap.to(toTopEl, 0.2, {
      x: 100, //x축으로 얼마나 이동할지
    });
  }
};

toTopEl.addEventListener("click", function () {
  gsap.to(window, 0.7, {
    scrollTo: 0, // 화면의 위치를 0px 지점으로 옮기겠다.
  });
});
// =================== end: gsap =================== //

// fadeEls.forEach(function (fadeEl, index) {
//   // gsap.to(요소, 지속시간, 옵션);
//   gsap.to(fadeEl, 1, {
//     delay: (index + 1) * 0.7,
//     opacity: 1,
//   });
// });이거랑 아래랑도 같은거 / handleImgDelay으로 함수를 분리 시킴

const handleImgDelay = (fadeEl, index) => {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7,
    opacity: 1,
  });
};

const toggleBtn = () => {
  isHidePromotion = !isHidePromotion; //클릭 시 계속 반대로 나오게 하는거 true 였다가 false 였다가
  if (isHidePromotion) {
    promotionEl.classList.add("hide");
  } else {
    promotionEl.classList.remove("hide");
  }
};

// =================== start: function =================== //
searchEl.addEventListener("click", function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  searchInputEl.setAttribute("placeholder", "통합검색");
});

searchInputEl.addEventListener("blur", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
});
window.addEventListener("scroll", _.throttle(handleScrollLodash, 300)); //_.throttle(함수, 시간)
fadeEls.forEach(handleImgDelay);
promotionToggleBtn.addEventListener("click", toggleBtn);
// =================== end: function =================== //

// =================== start: swiper 공지사항 슬라이드(선택자, 옵션) =================== //
new Swiper(".notice-line .swiper-container", {
  direction: "vertical",
  autoplay: true,
  loop: true,
});

new Swiper(".promotion .swiper-container", {
  slidesPerView: 3, //한번에 보여줄 슬라이드 갯수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데에 배치되도록
  loop: true,
  // autoplay: {
  //   delay: 5000,
  // },
  pagination: {
    el: ".promotion .swiper-pagination", //페이지 번호 요소 선택자
    clickable: true, //사용자가 페이지 번호 요소 제어 가능한지 여부
  },
  navigation: {
    prevEl: ".promotion .swiper-prev",
    nextEl: ".promotion .swiper-next",
  },
});

// =================== end: swiper 공지사항 슬라이드(선택자, 옵션) =================== //

// =================== start: swiper 배너 =================== //
new Swiper(".awards .swiper-container", {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5, //하나의 화면에 몇개의 슬라이드를 보여줄껀지
  navigation: {
    prevEl: ".awards .swiper-prev",
    nextEl: ".awards .swiper-next",
  },
});
// =================== end: swiper 배너 =================== //

// =================== start: gsap 스타벅스 영상 위에 떠다니는 이미지 애니매이션 =================== //
// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간(원래는 1, 2처럼 숫자로. 근데 지금은 random이라는 랜덤함수를 적용), {옵션});
  gsap.to(selector, random(1.5, 2.5), {
    y: size,
    repeat: -1, //-1:무한반복을 의미
    yoyo: true, //한번 재생된 애니매이션을 거꾸로 다시 반복하도록
    ease: Power1.easeInOut, //https://greensock.com/docs/v2/Easing 여기서 복사해옴
    delay: random(0, delay),
  });
}
floatingObject(".floating1", 1, 15); //(요소, 딜레이, px)
floatingObject(".floating2", 0.5, 15);
floatingObject(".floating3", 1.5, 20);

// =================== end: gsap 스타벅스 영상 위에 떠다니는 이미지 애니매이션 =================== //

// =================== start: 전체 화면 기준 80% 이하로 스크롤 내려가면 작동 =================== //
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: 0.8,
  })
    .setClassToggle(spyEl, "show")
    .addTo(new ScrollMagic.Controller());
});
// =================== end: 전체 화면 기준 80% 이하로 스크롤 내려가면 작동 =================== //

// =================== start: footer 해당 년도 자동 기록 =================== //
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); //2023
// =================== start: footer 해당 년도 자동 기록 =================== //
