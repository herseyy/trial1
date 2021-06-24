document.onkeydown = function(e) {
    if(e.keyCode == 123) {
     return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
     return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
     return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
     return false;
    }

    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
     return false;
    }      
 }

var slideshowDuration = 4000;
var slideshow=$('.main-content .slideshow');


function slideshowSwitch(slideshow,index,auto){
  if(slideshow.data('wait')) return;

  var slides = slideshow.find('.slide');
  var pages = slideshow.find('.pagination');
  var activeSlide = slides.filter('.is-active');
  var activeSlideImage = activeSlide.find('.image-container');
  var newSlide = slides.eq(index);
  var newSlideImage = newSlide.find('.image-container');
  var newSlideContent = newSlide.find('.slide-content');
  var newSlideElements=newSlide.find('.caption > *');
  if(newSlide.is(activeSlide))return;

  newSlide.addClass('is-new');
  var timeout=slideshow.data('timeout');
  clearTimeout(timeout);
  slideshow.data('wait',true);
  var transition=slideshow.attr('data-transition');
  if(transition=='fade'){
    newSlide.css({
      display:'block',
      zIndex:2
    });
    newSlideImage.css({
      opacity:0
    });

    TweenMax.to(newSlideImage,1,{
      alpha:1,
      onComplete:function(){
        newSlide.addClass('is-active').removeClass('is-new');
        activeSlide.removeClass('is-active');
        newSlide.css({display:'',zIndex:''});
        newSlideImage.css({opacity:''});
        slideshow.find('.pagination').trigger('check');
        slideshow.data('wait',false);
        if(auto){
          timeout=setTimeout(function(){
            slideshowNext(slideshow,false,true);
          },slideshowDuration);
          slideshow.data('timeout',timeout);}}});
  } else {
    if(newSlide.index()>activeSlide.index()){
      var newSlideRight=0;
      var newSlideLeft='auto';
      var newSlideImageRight=-slideshow.width()/8;
      var newSlideImageLeft='auto';
      var newSlideImageToRight=0;
      var newSlideImageToLeft='auto';
      var newSlideContentLeft='auto';
      var newSlideContentRight=0;
      var activeSlideImageLeft=-slideshow.width()/4;
    } else {
      var newSlideRight='';
      var newSlideLeft=0;
      var newSlideImageRight='auto';
      var newSlideImageLeft=-slideshow.width()/8;
      var newSlideImageToRight='';
      var newSlideImageToLeft=0;
      var newSlideContentLeft=0;
      var newSlideContentRight='auto';
      var activeSlideImageLeft=slideshow.width()/4;
    }

    newSlide.css({
      display:'block',
      width:0,
      right:newSlideRight,
      left:newSlideLeft
      ,zIndex:2
    });

    newSlideImage.css({
      width:slideshow.width(),
      right:newSlideImageRight,
      left:newSlideImageLeft
    });

    newSlideContent.css({
      width:slideshow.width(),
      left:newSlideContentLeft,
      right:newSlideContentRight
    });

    activeSlideImage.css({
      left:0
    });

    TweenMax.set(newSlideElements,{y:20,force3D:true});
    TweenMax.to(activeSlideImage,1,{
      left:activeSlideImageLeft,
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlide,1,{
      width:slideshow.width(),
      ease:Power3.easeInOut
    });

    TweenMax.to(newSlideImage,1,{
      right:newSlideImageToRight,
      left:newSlideImageToLeft,
      ease:Power3.easeInOut
    });

    TweenMax.staggerFromTo(newSlideElements,0.8,{alpha:0,y:60},{alpha:1,y:0,ease:Power3.easeOut,force3D:true,delay:0.6},0.1,function(){
      newSlide.addClass('is-active').removeClass('is-new');
      activeSlide.removeClass('is-active');
      newSlide.css({
        display:'',
        width:'',
        left:'',
        zIndex:''
      });

      newSlideImage.css({
        width:'',
        right:'',
        left:''
      });

      newSlideContent.css({
        width:'',
        left:''
      });

      newSlideElements.css({
        opacity:'',
        transform:''
      });

      activeSlideImage.css({
        left:''
      });

      slideshow.find('.pagination').trigger('check');
      slideshow.data('wait',false);
      if(auto){
        timeout=setTimeout(function(){
          slideshowNext(slideshow,false,true);
        },slideshowDuration);
        slideshow.data('timeout',timeout);
      }
    });
  }
}

function slideshowNext(slideshow,previous,auto){
  var slides=slideshow.find('.slide');
  var activeSlide=slides.filter('.is-active');
  var newSlide=null;
  if(previous){
    newSlide=activeSlide.prev('.slide');
    if(newSlide.length === 0) {
      newSlide=slides.last();
    }
  } else {
    newSlide=activeSlide.next('.slide');
    if(newSlide.length==0)
      newSlide=slides.filter('.slide').first();
  }

  slideshowSwitch(slideshow,newSlide.index(),auto);
}

function homeSlideshowParallax(){
  var scrollTop=$(window).scrollTop();
  if(scrollTop>windowHeight) return;
  var inner=slideshow.find('.slideshow-inner');
  var newHeight=windowHeight-(scrollTop/2);
  var newTop=scrollTop*0.8;

  inner.css({
    transform:'translateY('+newTop+'px)',height:newHeight
  });
}

$(document).ready(function() {
 $('.slide').addClass('is-loaded');

 $('.slideshow .arrows .arrow').on('click',function(){
  slideshowNext($(this).closest('.slideshow'),$(this).hasClass('prev'));
});


 $('.slideshow .pagination .item').on('click',function(){
  slideshowSwitch($(this).closest('.slideshow'),$(this).index());
});

 $('.slideshow .pagination').on('check',function(){
  var slideshow=$(this).closest('.slideshow');
  var pages=$(this).find('.item');
  var index=slideshow.find('.slides .is-active').index();
  pages.removeClass('is-active');
  pages.eq(index).addClass('is-active');
});


/* Lazyloading
$('.slideshow').each(function(){
  var slideshow=$(this);
  var images=slideshow.find('.image').not('.is-loaded');
  images.on('loaded',function(){
    var image=$(this);
    var slide=image.closest('.slide');
    slide.addClass('is-loaded');
  });
*/

var timeout=setTimeout(function(){
  slideshowNext(slideshow,false,true);
},slideshowDuration);

slideshow.data('timeout',timeout);
});

if($('.main-content .slideshow').length > 1) {
  $(window).on('scroll',homeSlideshowParallax);
}

var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.write('<meta name="viewport" content="width=device-width,height='+window.innerHeight+', initial-scale=1.0">');
}



var score = 0;

var attemptsb1 = 3;
function balbal1() {
  var x, text;

  x = document.getElementById("balbal1").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = ""
  } 

  else if (l_case == "starbs") {
    document.getElementById("submit1").style.display = "none";
    score++;
    text1 = "&#x2705; Ang starbs ay nangangahulugang pakopya.";
    text = "";
  }

  else {
    if (attemptsb1 > 0) {
      attemptsb1--;
      if (attemptsb1 == 2) {
        document.getElementById("b1h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb1;
        text1 = ""
      }

      else if (attemptsb1 == 1) {
        document.getElementById("b1h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb1;
        text1 = ""
      }

      else if (attemptsb1 == 0) {
        document.getElementById("b1h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb1;
        text1 = ""
      }
    }

    else {
      document.getElementById("submit1").style.display = "none";
      text = "starbs";
      text1 = "&#10060; Ang starbs ay nangangahulugang pakopya.";
    }
  }

  document.getElementById("b1").innerHTML = text;
  document.getElementById("b1h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b1hint1() {
  document.getElementById("b1h").innerHTML = "May anim na letra";
}
function b1hint2() {
  document.getElementById("b1h").innerHTML = "Madalas gawin sa eskwelahan";
}
function b1hint3() {
  document.getElementById("b1h").innerHTML = "Gawain mo kapag walang takdang aralin";
}


var attemptsb2 = 3;
function balbal2() {
  var x, text;

  x = document.getElementById("balbal2").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = ""
  } 

  else if (l_case == "sags") {
    document.getElementById("submit2").style.display = "none";
    score++;
    text1 = "&#x2705; Ang sags ay nangangahulugang pilit.";
    text = "";
  }

  else {
    if (attemptsb2 > 0) {
      attemptsb2--;
      if (attemptsb2 == 2) {
        document.getElementById("b2h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb2;
        text1 = "";
      }

      else if (attemptsb2 == 1) {
        document.getElementById("b2h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb2;
        text1 = "";
      }

      else if (attemptsb2 == 0) {
        document.getElementById("b2h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb2;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit2").style.display = "none";
      text = "sags";
      text1 = "&#10060; Ang sags ay nangangahulugang pilit.";
    }
  }

  document.getElementById("b2").innerHTML = text;
  document.getElementById("b2h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b2hint1() {
  document.getElementById("b2h").innerHTML = "May apat na letra";
}
function b2hint2() {
  document.getElementById("b2h").innerHTML = "Madalas mong gawin kapag nagpipinta";
}
function b2hint3() {
  document.getElementById("b2h").innerHTML = "Ginagawa mo kapag wala kang gana";
}


var attemptsb3 = 3;
function balbal3() {
  var x, text;

  x = document.getElementById("balbal3").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text1 = "";
    text = "Punan ang patlang ng salitang balbal.";
  } 

  else if (l_case == "pics") {
    document.getElementById("submit3").style.display = "none";
    score++;
    text1 = "&#x2705; Ang pics ay nangangahulugang go ako.";
    text = "";
  }

  else {
    if (attemptsb3 > 0) {
      attemptsb3--;
      if (attemptsb3 == 2) {
        document.getElementById("b3h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb3;
        text1 = "";
      }

      else if (attemptsb3 == 1) {
        document.getElementById("b3h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb3;
        text1 = "";
      }

      else if (attemptsb3 == 0) {
        document.getElementById("b3h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb3;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit3").style.display = "none";
      text = "pics";
      text1 = "&#10060; Ang pics ay nangangahulugang go ako.";
    }
  }

  document.getElementById("b3").innerHTML = text;
  document.getElementById("b3h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b3hint1() {
  document.getElementById("b3h").innerHTML = "May apat na letra";
}
function b3hint2() {
  document.getElementById("b3h").innerHTML = "Madalas mangyari kapag may pupuntahan";
}
function b3hint3() {
  document.getElementById("b3h").innerHTML = "Lagi mong sinasabi kapag pinayagan ka";
}


var attemptsb4 = 3;
function balbal4() {
  var x, text;

  x = document.getElementById("balbal4").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "carps") {
    document.getElementById("submit4").style.display = "none";
    score++;
    text1 = "&#x2705; Ang carps ay ang pagtatanong kung game ka ba.";
    text = "";
  }

  else {
    if (attemptsb4 > 0) {
      attemptsb4--;
      if (attemptsb4 == 2) {
        document.getElementById("b4h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb4;
        text1 = "";
      }

      else if (attemptsb4 == 1) {
        document.getElementById("b4h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb4;
        text1 = "";
      }

      else if (attemptsb4 == 0) {
        document.getElementById("b4h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb4;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit4").style.display = "none";
      text = "carps";
      text1 = "&#10060; Ang carps ay ang pagtatanong kung game ka ba.";
    }
  }

  document.getElementById("b4").innerHTML = text;
  document.getElementById("b4h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b4hint1() {
  document.getElementById("b4h").innerHTML = "May limang letra";
}
function b4hint2() {
  document.getElementById("b4h").innerHTML = "Madalas itanong kapag inaakit ka";
}
function b4hint3() {
  document.getElementById("b4h").innerHTML = "Patok din ito kapag magbobonding";
}


var attemptsb5 = 3;
function balbal5() {
  var x, text;

  x = document.getElementById("balbal5").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "sharks") {
    document.getElementById("submit5").style.display = "none";
    score++;
    text1 = "&#x2705; Ang sharks ay nangangahulugang patingin.";
    text = "";
  }

  else {
    if (attemptsb5 > 0) {
      attemptsb5--;
      if (attemptsb5 == 2) {
        document.getElementById("b5h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb5;
        text1 = "";
      }

      else if (attemptsb5 == 1) {
        document.getElementById("b5h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb5;
        text1 = "";
      }

      else if (attemptsb5 == 0) {
        document.getElementById("b5h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb5;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit5").style.display = "none";
      text = "sharks";
      text1 = "&#10060; Ang sharks ay nangangahulugang patingin.";
    }
  }

  document.getElementById("b5").innerHTML = text;
  document.getElementById("b5h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b5hint1() {
  document.getElementById("b5h").innerHTML = "May anim na letra";
}
function b5hint2() {
  document.getElementById("b5h").innerHTML = "Mga karniborang isda";
}
function b5hint3() {
  document.getElementById("b5h").innerHTML = "Iniimik tuwing interesado kang tingnan ang isang bagay";
}


var attemptsb6 = 3;
function balbal6() {
  var x, text;

  x = document.getElementById("balbal6").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "scoobs") {
    document.getElementById("submit6").style.display = "none";
    score++;
    text1 = "&#x2705; Ang scoobs ay nangangahulugang hindi.";
    text = "";
  }

  else {
    if (attemptsb6 > 0) {
      attemptsb6--;
      if (attemptsb6 == 2) {
        document.getElementById("b6h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb6;
        text1 = "";
      }

      else if (attemptsb6 == 1) {
        document.getElementById("b6h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb6;
        text1 = "";
      }

      else if (attemptsb6 == 0) {
        document.getElementById("b6h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb6;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit6").style.display = "none";
      text = "scoobs";
      text1 = "&#10060; Ang scoobs ay nangangahulugang hindi.";
    }
  }

  document.getElementById("b6").innerHTML = text;
  document.getElementById("b6h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b6hint1() {
  document.getElementById("b6h").innerHTML = "May anim na letra";
}
function b6hint2() {
  document.getElementById("b6h").innerHTML = "Katunog ng isang sikat na dog cartoon character";
}
function b6hint3() {
  document.getElementById("b6h").innerHTML = "Paraan ng pagtanggi";
}


var attemptsb7 = 3;
function balbal7() {
  var x, text;

  x = document.getElementById("balbal7").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "salt") {
    document.getElementById("submit7").style.display = "none";
    score++;
    text1 = "&#x2705; Ang salt ay nangangahulugang talaga.";
    text = "";
  }

  else {
    if (attemptsb7 > 0) {
      attemptsb7--;
      if (attemptsb7 == 2) {
        document.getElementById("b7h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb7;
        text1 = "";
      }

      else if (attemptsb7 == 1) {
        document.getElementById("b7h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb7;
        text1 = "";
      }

      else if (attemptsb7 == 0) {
        document.getElementById("b7h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb7;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit7").style.display = "none";
      text = "salt";
      text1 = "&#10060; Ang salt ay nangangahulugang talaga.";
    }
  }

  document.getElementById("b7").innerHTML = text;
  document.getElementById("b7h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b7hint1() {
  document.getElementById("b7h").innerHTML = "May apat na letra";
}
function b7hint2() {
  document.getElementById("b7h").innerHTML = "Salitang naglalahad ng pagsang-ayon";
}
function b7hint3() {
  document.getElementById("b7h").innerHTML = "Madalas sabihin kapag may pagdududa";
}


var attemptsb8 = 3;
function balbal8() {
  var x, text;

  x = document.getElementById("balbal8").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "tea") {
    document.getElementById("submit8").style.display = "none";
    score++;
    text1 = "&#x2705; Ang tea ay nangangahulugang tsismis.";
    text = "";
  }

  else {
    if (attemptsb8 > 0) {
      attemptsb8--;
      if (attemptsb8 == 2) {
        document.getElementById("b8h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb8;
        text1 = "";
      }

      else if (attemptsb8 == 1) {
        document.getElementById("b8h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb8;
        text1 = "";
      }

      else if (attemptsb8 == 0) {
        document.getElementById("b8h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb8;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit8").style.display = "none";
      text = "tea";
      text1 = "&#10060; Ang tea ay nangangahulugang tsismis.";
    }
  }

  document.getElementById("b8").innerHTML = text;
  document.getElementById("b8h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b8hint1() {
  document.getElementById("b8h").innerHTML = "May tatlong letra";
}
function b8hint2() {
  document.getElementById("b8h").innerHTML = "Kadalasang tawag sa 'chismis'";
}
function b8hint3() {
  document.getElementById("b8h").innerHTML = "Mainam na inumin tuwing umaga";
}


var attemptsb9 = 3;
function balbal9() {
  var x, text;

  x = document.getElementById("balbal9").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = ""
  } 

  else if (l_case == "salty") {
    document.getElementById("submit9").style.display = "none";
    score++;
    text1 = "&#x2705; Ang salty ay tumutukoy sa taong barinuhin.";
    text = "";
  }

  else {
    if (attemptsb9 > 0) {
      attemptsb9--;
      if (attemptsb9 == 2) {
        document.getElementById("b9h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb9;
        text1 = ""
      }

      else if (attemptsb9 == 1) {
        document.getElementById("b9h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb9;
        text1 = ""
      }

      else if (attemptsb9 == 0) {
        document.getElementById("b9h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb9;
        text1 = ""
      }
    }

    else {
      document.getElementById("submit9").style.display = "none";
      text = "salty";
      text1 = "&#10060; Ang salty ay tumutukoy sa taong barinuhin.";
    }
  }

  document.getElementById("b9").innerHTML = text;
  document.getElementById("b9h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b9hint1() {
  document.getElementById("b9h").innerHTML = "May limang letra";
}
function b9hint2() {
  document.getElementById("b9h").innerHTML = "Sangkap sa pagluluto";
}
function b9hint3() {
  document.getElementById("b9h").innerHTML = "Katangian ng isang tao na may koneksyon sa mainitin ang ulo";
}


var attemptsb10 = 3;
function balbal10() {
  var x, text;

  x = document.getElementById("balbal10").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = ""
  } 

  else if (l_case == "bop") {
    document.getElementById("submit10").style.display = "none";
    score++;
    text1 = "&#x2705; Ang bop tumutukoy sa magandang kanta na mapapasayaw ka.";
    text = "";
  }
  else {
    if (attemptsb10 > 0) {
      attemptsb10--;
      if (attemptsb10 == 2) {
        document.getElementById("b10h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb10;
        text1 = ""
      }

      else if (attemptsb10 == 1) {
        document.getElementById("b10h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb10;
        text1 = ""
      }

      else if (attemptsb10 == 0) {
        document.getElementById("b10h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb10;
        text1 = ""
      }
    }

    else {
      document.getElementById("submit10").style.display = "none";
      text = "bop";
      text1 = "&#10060; Ang bop tumutukoy sa magandang kanta na mapapasayaw ka.";
    }
  }

  document.getElementById("b10").innerHTML = text;
  document.getElementById("b10h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b10hint1() {
  document.getElementById("b10h").innerHTML = "May tatlong letra";
}
function b10hint2() {
  document.getElementById("b10h").innerHTML = "Kasing tunog ng salitang 'pop'";
}
function b10hint3() {
  document.getElementById("b10h").innerHTML = "Ang salitang ito ay may kaugnayan sa isang magandang kanta";
}


var attemptsb11 = 3;
function balbal11() {
  var x, text;

  x = document.getElementById("balbal11").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "timbs") {
    document.getElementById("submit11").style.display = "none";
    score++;
    text1 = "&#x2705;   Ang timbs ay pagtatanong ng bakit.";
    text = "";
  }

  else {
    if (attemptsb11 > 0) {
      attemptsb11--;
      if (attemptsb11 == 2) {
        document.getElementById("b11h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb11;
        text1 = "";
      }

      else if (attemptsb11 == 1) {
        document.getElementById("b11h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb11;
        text1 = "";
      }

      else if (attemptsb11 == 0) {
        document.getElementById("b11h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb11;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit11").style.display = "none";
      text = "timbs";
      text1 = "&#10060; Ang timbs ay pagtatanong ng bakit.";
    }
  }

  document.getElementById("b11").innerHTML = text;
  document.getElementById("b11h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b11hint1() {
  document.getElementById("b11h").innerHTML = "May limang letra";
}
function b11hint2() {
  document.getElementById("b11h").innerHTML = "Malapit sa salitang 'timba'";
}
function b11hint3() {
  document.getElementById("b11h").innerHTML = "Ang salitang ito ay may kaugnayan sa katagang sinasabi sa pagtatanong ng dahilan";
}


var attemptsb12 = 3;

function balbal12() {
  var x, text;

  x = document.getElementById("balbal12").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "awit") {
    document.getElementById("submit12").style.display = "none";
    score++;
    text1 = "&#x2705; Ang awit ay pinagsamang aw at sakit.";
    text = "";
  }

  else {
    if (attemptsb12 > 0) {
      attemptsb12--;
      if (attemptsb12 == 2) {
        document.getElementById("b12h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb12;
        text1 = "";
      }

      else if (attemptsb12 == 1) {
        document.getElementById("b12h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb12;
        text1 = "";
      }

      else if (attemptsb12 == 0) {
        document.getElementById("b12h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb12;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit12").style.display = "none";
      text = "awit";
      text1 = "&#10060; Ang awit ay pinagsamang aw at sakit.";
    }
  }

  document.getElementById("b12").innerHTML = text;
  document.getElementById("b12h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b12hint1() {
  document.getElementById("b12h").innerHTML = "May apat na letra";
}
function b12hint2() {
  document.getElementById("b12h").innerHTML = "Kadalasang sinasabi ng mga kabataan";
}
function b12hint3() {
  document.getElementById("b12h").innerHTML = "Ang salitang ito ay may kaugnayan sa musika";
}


var attemptsb13 = 3;

function balbal13() {
  var x, text;

  x = document.getElementById("balbal13").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = ""
  } 

  else if (l_case == "achoo") {
    document.getElementById("submit13").style.display = "none";
    score++;
    text1 = "&#x2705; Ang achoo ay tumutukoy sa baklang mukhang straight.";
    text = "";
  }

  else {
    if (attemptsb13 > 0) {
      attemptsb13--;
      if (attemptsb13 == 2) {
        document.getElementById("b13h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb13;
        text1 = "";
      }

      else if (attemptsb13 == 1) {
        document.getElementById("b13h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb13;
        text1 = "";
      }

      else if (attemptsb13 == 0) {
        document.getElementById("b13h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb13;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit13").style.display = "none";
      text = "achoo";
      text1 = "&#10060; Ang achoo ay tumutukoy sa baklang mukhang straight.";
    }
  }

  document.getElementById("b13").innerHTML = text;
  document.getElementById("b13h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b13hint1() {
  document.getElementById("b13h").innerHTML = "May limang letra";
}
function b13hint2() {
  document.getElementById("b13h").innerHTML = "Ito ay ekspresyon na nababanggit tuwing nababahing ang isang tao";
}
function b13hint3() {
  document.getElementById("b13h").innerHTML = "Kasing tunog ng tunog ng sasakyang tren";
}



var attemptsb14 = 3;
function balbal14() {
  var x, text;

  x = document.getElementById("balbal14").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "tsimay") {
    document.getElementById("submit14").style.display = "none";
    score++;
    text1 = "&#x2705; Ang tsimay ay tumutukoy sa katulong.";
    text = "";
  }

  else {
    if (attemptsb14 > 0) {
      attemptsb14--;
      if (attemptsb14 == 2) {
        document.getElementById("b14h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb14;
        text1 = "";
      }

      else if (attemptsb14 == 1) {
        document.getElementById("b14h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb14;
        text1 = "";
      }

      else if (attemptsb14 == 0) {
        document.getElementById("b14h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb14;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit14").style.display = "none";
      text = "tsimay";
      text1 = "&#10060; Ang tsimay ay tumutukoy sa katulong.";
    }
  }

  document.getElementById("b14").innerHTML = text;
  document.getElementById("b14h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}


function b14hint1() {
  document.getElementById("b14h").innerHTML = "May 6 letra";
}
function b14hint2() {
  document.getElementById("b14h").innerHTML = "Kasing tunog ng salitang 'kamay'";
}
function b14hint3() {
  document.getElementById("b14h").innerHTML = "Kadalasang gumagawa ng gawaing bahay";
}


var attemptsb15 = 3;

function balbal15() {
  var x, text;

  x = document.getElementById("balbal15").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "gumps") {
    document.getElementById("submit15").style.display = "none";
    score++;
    text1 = "&#x2705; Ang gumps ay nangangahulugang salamat.";
    text = "";
  }

  else {
    if (attemptsb15 > 0) {
      attemptsb15--;
      if (attemptsb15 == 2) {
        document.getElementById("b15h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb15;
        text1 = "";
      }

      else if (attemptsb15 == 1) {
        document.getElementById("b15h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb15;
        text1 = "";
      }

      else if (attemptsb15 == 0) {
        document.getElementById("b15h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb15;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit15").style.display = "none";
      text = "gumps";
      text1 = "&#10060; Ang gumps ay nangangahulugang salamat.";
    }
  }

  document.getElementById("b15").innerHTML = text;
  document.getElementById("b15h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b15hint1() {
  document.getElementById("b15h").innerHTML = "Pagbati";
}
function b15hint2() {
  document.getElementById("b15h").innerHTML = "May limang letra";
}
function b15hint3() {
  document.getElementById("b15h").innerHTML = "Ito ay sinasabi matapos tulungan ang isang tao";
}


var attemptsb16 = 3;

function balbal16() {
  var x, text;

  x = document.getElementById("balbal16").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "pots") {
    document.getElementById("submit16").style.display = "none";
    score++;
    text1 = "&#x2705; Ang pots ay nangangahulugang okay.";
    text = "";
  }

  else {
    if (attemptsb16 > 0) {
      attemptsb16--;
      if (attemptsb16 == 2) {
        document.getElementById("b16h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb16;
        text1 = "";
      }

      else if (attemptsb16 == 1) {
        document.getElementById("b16h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb16;
        text1 = "";
      }

      else if (attemptsb16 == 0) {
        document.getElementById("b16h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb16;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit16").style.display = "none";
      text = "pots";
      text1 = "&#10060; Ang pots ay nangangahulugang okay.";
    }
  }

  document.getElementById("b16").innerHTML = text;
  document.getElementById("b16h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b16hint1() {
  document.getElementById("b16h").innerHTML = "Pagtugon";
}
function b16hint2() {
  document.getElementById("b16h").innerHTML = "May apat na letra";
}
function b16hint3() {
  document.getElementById("b16h").innerHTML = "Ginagamit upang ipahiwatig ang pagsang-ayon sa isang bagay";
}


var attemptsb17 = 3;

function balbal17() {
  var x, text;

  x = document.getElementById("balbal17").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "caps") {
    document.getElementById("submit17").style.display = "none";
    score++;
    text1 = "&#x2705; Ang caps ay nangangahulugang hindi totoo.";
    text = "";
  }

  else {
    if (attemptsb17 > 0) {
      attemptsb17--;
      if (attemptsb17 == 2) {
        document.getElementById("b17h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb17;
        text1 = "";
      }

      else if (attemptsb17 == 1) {
        document.getElementById("b17h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb17;
        text1 = "";
      }

      else if (attemptsb17 == 0) {
        document.getElementById("b17h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb17;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit17").style.display = "none";
      text = "caps";
      text1 = "&#10060; Ang caps ay nangangahulugang hindi totoo.";
    }
  }

  document.getElementById("b17").innerHTML = text;
  document.getElementById("b17h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b17hint1() {
  document.getElementById("b17h").innerHTML = "Kabaliktaran ng katotohan";
}
function b17hint2() {
  document.getElementById("b17h").innerHTML = "May apat na letra";
}
function b17hint3() {
  document.getElementById("b17h").innerHTML = "Ito ay kawalan ng katunayan";
}




var attemptsb18 = 3;

function balbal18() {
  var x, text;

  x = document.getElementById("balbal18").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "sus") {
    document.getElementById("submit18").style.display = "none";
    score++;
    text1 = "&#x2705; Ang sus ay nangangahulugang kahina-hinala.";
    text = "";
  }

  else {
    if (attemptsb18 > 0) {
      attemptsb18--;
      if (attemptsb18 == 2) {
        document.getElementById("b18h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb18;
        text1 = "";
      }

      else if (attemptsb18 == 1) {
        document.getElementById("b18h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb18;
        text1 = "";
      }

      else if (attemptsb18 == 0) {
        document.getElementById("b18h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb18;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit18").style.display = "none";
      text = "sus";
      text1 = "&#10060; Ang sus ay nangangahulugang kahina-hinala.";
    }
  }

  document.getElementById("b18").innerHTML = text;
  document.getElementById("b18h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b18hint1() {
  document.getElementById("b18h").innerHTML = "Kilos ng isang tao";
}
function b18hint2() {
  document.getElementById("b18h").innerHTML = "May tatlo na letra";
}
function b18hint3() {
  document.getElementById("b18h").innerHTML = "Ang salitang ito ay may koneksiyon sa hindi mapaniniwalaan na kilos ng isang tao";
}


var attemptsb19 = 3;

function balbal19() {
  var x, text;

  x = document.getElementById("balbal19").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "mom jeans") {
    document.getElementById("submit19").style.display = "none";
    score++;
    text1 = "&#x2705; Ang mom jeans ay tumutukoy sa taong sabog.";
    text = "";
  }

  else {
    if (attemptsb19 > 0) {
      attemptsb19--;
      if (attemptsb19 == 2) {
        document.getElementById("b19h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb19;
        text1 = "";
      }

      else if (attemptsb19 == 1) {
        document.getElementById("b19h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb19;
        text1 = "";
      }

      else if (attemptsb19 == 0) {
        document.getElementById("b19h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb19;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit19").style.display = "none";
      text = "mom jeans";
      text1 = "&#10060; Ang mom jeans ay tumutukoy sa taong sabog.";
    }
  }

  document.getElementById("b19").innerHTML = text;
  document.getElementById("b19h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b19hint1() {
  document.getElementById("b19h").innerHTML = "Mayroong malakas na tunog";
}
function b19hint2() {
  document.getElementById("b19h").innerHTML = "Dalawang salita at nagkakaroon ng walong letra";
}
function b19hint3() {
  document.getElementById("b19h").innerHTML = "Maaaring ipahiwating na wala sa sarili o kaya ay ito ay kadalasang naririnig sa giyera";
}


var attemptsb20 = 3;

function balbal20() {
  var x, text;

  x = document.getElementById("balbal20").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "kopong-kopong") {
    document.getElementById("submit20").style.display = "none";
    score++;
    text1 = "&#x2705; Ang kopong-kopong ay nangangahulugang makaluma.";
    text = "";
  }

  else {
    if (attemptsb20 > 0) {
      attemptsb20--;
      if (attemptsb20 == 2) {
        document.getElementById("b20h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb20;
        text1 = "";
      }

      else if (attemptsb20 == 1) {
        document.getElementById("b20h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb20;
        text1 = "";
      }

      else if (attemptsb20 == 0) {
        document.getElementById("b20h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb20;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit20").style.display = "none";
      text = "kopong-kopong";
      text1 = "&#10060; Ang kopong-kopong ay nangangahulugang makaluma.";
    }
  }

  document.getElementById("b20").innerHTML = text;
  document.getElementById("b20h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b20hint1() {
  document.getElementById("b20h").innerHTML = "Katunog ng ikalawang pantig sa tawag ng mga chinese sa larong table tennis";
}
function b20hint2() {
  document.getElementById("b20h").innerHTML = "Nauulit na salita at nagkakaroon ng labindalawa na letra";
}
function b20hint3() {
  document.getElementById("b20h").innerHTML = "Maaaring mainhalintulad sa antigong bagay, datihan at unang panahon";
}


var attemptsb21 = 3;

function balbal21() {
  var x, text;

  x = document.getElementById("balbal21").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "boujee") {
    document.getElementById("submit21").style.display = "none";
    score++;
    text1 = "&#x2705; Ang boujee ay nangangahulugang sosyal.";
    text = "";
  }

  else {
    if (attemptsb21 > 0) {
      attemptsb21--;
      if (attemptsb21 == 2) {
        document.getElementById("b21h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb21;
        text1 = "";
      }

      else if (attemptsb21 == 1) {
        document.getElementById("b21h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb21;
        text1 = "";
      }

      else if (attemptsb21 == 0) {
        document.getElementById("b21h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb21;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit21").style.display = "none";
      text = "boujee";
      text1 = "&#10060; Ang boujee ay nangangahulugang sosyal.";
    }
  }

  document.getElementById("b21").innerHTML = text;
  document.getElementById("b21h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b21hint1() {
  document.getElementById("b21h").innerHTML = "Katangian ng isang indibidwal";
}
function b21hint2() {
  document.getElementById("b21h").innerHTML = "Mamahalin ang mga binibili";
}
function b21hint3() {
  document.getElementById("b21h").innerHTML = "Magarang uri ng pamumuhay";
}


var attemptsb22 = 3;

function balbal22() {
  var x, text;

  x = document.getElementById("balbal22").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "temakats") {
    document.getElementById("submit22").style.display = "none";
    score++;
    text1 = "&#x2705; Ang temakats ay nangangahulugang makati.";
    text = "";
  }

  else {
    if (attemptsb22 > 0) {
      attemptsb22--;
      if (attemptsb22 == 2) {
        document.getElementById("b22h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb22;
        text1 = "";
      }

      else if (attemptsb22 == 1) {
        document.getElementById("b22h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb22;
        text1 = "";
      }

      else if (attemptsb22 == 0) {
        document.getElementById("b22h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb22;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit22").style.display = "none";
      text = "temakats";
      text1 = "&#10060; Ang temakats ay nangangahulugang makati.";
    }
  }

  document.getElementById("b22").innerHTML = text;
  document.getElementById("b22h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b22hint1() {
  document.getElementById("b22h").innerHTML = "Katunog ng isang lugar sa NCR";
}
function b22hint2() {
  document.getElementById("b22h").innerHTML = "Maaaring resulta ng pagkagat ng isang insekto";
}
function b22hint3() {
  document.getElementById("b22h").innerHTML = "Kinakamot";
}


var attemptsb23 = 3;

function balbal23() {
  var x, text;

  x = document.getElementById("balbal23").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "awpit") {
    document.getElementById("submit23").style.display = "none";
    score++;
    text1 = "&#x2705; Ang awpit ay pinagsamang aw at pangit.";
    text = "";
  }

  else {
    if (attemptsb23 > 0) {
      attemptsb23--;
      if (attemptsb23 == 2) {
        document.getElementById("b23h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb23;
        text1 = "";
      }

      else if (attemptsb23 == 1) {
        document.getElementById("b23h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb23;
        text1 = "";
      }

      else if (attemptsb23 == 0) {
        document.getElementById("b23h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb23;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit23").style.display = "none";
      text = "awpit";
      text1 = "&#10060; Ang awpit ay pinagsamang aw at pangit.";
    }
  }

  document.getElementById("b23").innerHTML = text;
  document.getElementById("b23h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b23hint1() {
  document.getElementById("b23h").innerHTML = "Pinagsamang salita";
}
function b23hint2() {
  document.getElementById("b23h").innerHTML = "Ang unang pantig ay tunog na nagmumula sa aso";
}
function b23hint3() {
  document.getElementById("b23h").innerHTML = "Ang ikalawang pantig ay mula sa salitang tumutukoy sa hindi kaaya-ayang itsura.";
}

var attemptsb24 = 3;

function balbal24() {
  var x, text;

  x = document.getElementById("balbal24").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "borlog") {
    document.getElementById("submit24").style.display = "none";
    score++;
    text1 = "&#x2705; Ang borlog ay nangangahulugang tulog.";
    text = "";
  }

  else {
    if (attemptsb24 > 0) {
      attemptsb24--;
      if (attemptsb24 == 2) {
        document.getElementById("b24h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb24;
        text1 = "";
      }

      else if (attemptsb24 == 1) {
        document.getElementById("b24h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb24;
        text1 = "";
      }

      else if (attemptsb24 == 0) {
        document.getElementById("b24h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb24;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit24").style.display = "none";
      text = "borlog";
      text1 = "&#10060; Ang borlog ay nangangahulugang tulog.";
    }
  }

  document.getElementById("b24").innerHTML = text;
  document.getElementById("b24h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b24hint1() {
  document.getElementById("b24h").innerHTML = "Walang nalalaman";
}
function b24hint2() {
  document.getElementById("b24h").innerHTML = "Nakapikit";
}
function b24hint3() {
  document.getElementById("b24h").innerHTML = "Minsan humihilik";
}


var attemptsb25 = 3;

function balbal25() {
  var x, text;

  x = document.getElementById("balbal25").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "ebubot") {
    document.getElementById("submit25").style.display = "none";
    score++;
    text1 = "&#x2705; Ang ebubot ay babae.";
    text = "";
  }

  else {
    if (attemptsb25 > 0) {
      attemptsb25--;
      if (attemptsb25 == 2) {
        document.getElementById("b25h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb25;
        text1 = "";
      }

      else if (attemptsb25 == 1) {
        document.getElementById("b25h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb25;
        text1 = "";
      }

      else if (attemptsb25 == 0) {
        document.getElementById("b25h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb25;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit25").style.display = "none";
      text = "ebubot";
      text1 = "&#10060; Ang ebubot ay babae.";
    }
  }

  document.getElementById("b25").innerHTML = text;
  document.getElementById("b25h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b25hint1() {
  document.getElementById("b25h").innerHTML = "Mahaba ang buhok";
}
function b25hint2() {
  document.getElementById("b25h").innerHTML = "Mataas ang boses";
}
function b25hint3() {
  document.getElementById("b25h").innerHTML = "Kasarian na kabaliktaran ng lalaki";
}


var attemptsb26 = 3;

function balbal26() {
  var x, text;

  x = document.getElementById("balbal26").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "epalas") {
    document.getElementById("submit26").style.display = "none";
    score++;
    text1 = "&#x2705; Ang epalas ay salapi.";
    text = "";
  }

  else {
    if (attemptsb26 > 0) {
      attemptsb26--;
      if (attemptsb26 == 2) {
        document.getElementById("b26h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb26;
        text1 = "";
      }

      else if (attemptsb26 == 1) {
        document.getElementById("b26h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb26;
        text1 = "";
      }

      else if (attemptsb26 == 0) {
        document.getElementById("b26h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb26;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit26").style.display = "none";
      text = "epalas";
      text1 = "&#10060; Ang epalas ay salapi.";
    }
  }

  document.getElementById("b26").innerHTML = text;
  document.getElementById("b26h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b26hint1() {
  document.getElementById("b26h").innerHTML = "Mahalaga";
}
function b26hint2() {
  document.getElementById("b26h").innerHTML = "May iba’t ibang kulay";
}
function b26hint3() {
  document.getElementById("b26h").innerHTML = "Pinambabayad";
}


var attemptsb27 = 3;

function balbal27() {
  var x, text;

  x = document.getElementById("balbal27").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "tospik") {
    document.getElementById("submit27").style.display = "none";
    score++;
    text1 = "&#x2705; Ang tospik ay sapatos.";
    text = "";
  }

  else {
    if (attemptsb27 > 0) {
      attemptsb27--;
      if (attemptsb27 == 2) {
        document.getElementById("b27h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb27;
        text1 = "";
      }

      else if (attemptsb27 == 1) {
        document.getElementById("b27h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb27;
        text1 = "";
      }

      else if (attemptsb27 == 0) {
        document.getElementById("b27h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb27;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit27").style.display = "none";
      text = "tospik";
      text1 = "&#10060; Ang tospik ay sapatos.";
    }
  }

  document.getElementById("b27").innerHTML = text;
  document.getElementById("b27h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b27hint1() {
  document.getElementById("b27h").innerHTML = "Kasama kahit saan pumunta";
}
function b27hint2() {
  document.getElementById("b27h").innerHTML = "Kalimitang kinikolekta ng mga manlalaro";
}
function b27hint3() {
  document.getElementById("b27h").innerHTML = "Sinusuot sa parting paa";
}


var attemptsb28 = 3;

function balbal28() {
  var x, text;

  x = document.getElementById("balbal28").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "sondo") {
    document.getElementById("submit28").style.display = "none";
    score++;
    text1 = "&#x2705; Ang sondo ay piso.";
    text = "";
  }

  else {
    if (attemptsb28 > 0) {
      attemptsb28--;
      if (attemptsb28 == 2) {
        document.getElementById("b28h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb28;
        text1 = "";
      }

      else if (attemptsb28 == 1) {
        document.getElementById("b28h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb28;
        text1 = "";
      }

      else if (attemptsb28 == 0) {
        document.getElementById("b28h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb28;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit28").style.display = "none";
      text = "sondo";
      text1 = "&#10060; Ang sondo ay piso.";
    }
  }

  document.getElementById("b28").innerHTML = text;
  document.getElementById("b28h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b28hint1() {
  document.getElementById("b28h").innerHTML = "Kasingtunog ng 'sando'";
}
function b28hint2() {
  document.getElementById("b28h").innerHTML = "Isang uri ng pera";
}
function b28hint3() {
  document.getElementById("b28h").innerHTML = "Katumbas ng 100 sentimos";
}


var attemptsb29 = 3;

function balbal29() {
  var x, text;

  x = document.getElementById("balbal29").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "mateluk") {
    document.getElementById("submit29").style.display = "none";
    score++;
    text1 = "&#x2705; Ang mateluk ay nangangahulugang makulit.";
    text = "";
  }

  else {
    if (attemptsb29 > 0) {
      attemptsb29--;
      if (attemptsb29 == 2) {
        document.getElementById("b29h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb29;
        text1 = "";
      }

      else if (attemptsb29 == 1) {
        document.getElementById("b29h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb29;
        text1 = "";
      }

      else if (attemptsb29 == 0) {
        document.getElementById("b29h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb29;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit29").style.display = "none";
      text = "mateluk";
      text1 = "&#10060; Ang mateluk ay nangangahulugang makulit.";
    }
  }

  document.getElementById("b29").innerHTML = text;
  document.getElementById("b29h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b29hint1() {
  document.getElementById("b29h").innerHTML = "May pitong na letra";
}
function b29hint2() {
  document.getElementById("b29h").innerHTML = "Kadalasang sinasabi sa mga bata";
}
function b29hint3() {
  document.getElementById("b29h").innerHTML = "Hindi mapakali o pagiging mapaglaro";
}


var attemptsb30 = 3;

function balbal30() {
  var x, text;

  x = document.getElementById("balbal30").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "taratitat") {
    document.getElementById("submit30").style.display = "none";
    score++;
    text1 = "&#x2705; Ang taratitat ay nangangahulugang madaldal.";
    text = "";
  }

  else {
    if (attemptsb30 > 0) {
      attemptsb30--;
      if (attemptsb30 == 2) {
        document.getElementById("b30h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb30;
        text1 = "";
      }

      else if (attemptsb30 == 1) {
        document.getElementById("b30h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb30;
        text1 = "";
      }

      else if (attemptsb30 == 0) {
        document.getElementById("b30h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb30;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit30").style.display = "none";
      text = "taratitat"
      text1 = "&#10060; Ang taratitat ay nangangahulugang madaldal.";
    }
  }

  document.getElementById("b30").innerHTML = text;
  document.getElementById("b30h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b30hint1() {
  document.getElementById("b30h").innerHTML = "Isang katangian ng tao";
}
function b30hint2() {
  document.getElementById("b30h").innerHTML = "Hindi nauubusan ng sasabihin";
}
function b30hint3() {
  document.getElementById("b30h").innerHTML = "Masalita";
}


var attemptsb31 = 3;

function balbal31() {
  var x, text;

  x = document.getElementById("balbal31").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "papable") {
    document.getElementById("submit31").style.display = "none";
    score++;
    text1 = "&#x2705; Ang papable ay matipunong lalaki.";
    text = "";
  }


  else {
    if (attemptsb31 > 0) {
      attemptsb31--;
      if (attemptsb31 == 2) {
        document.getElementById("b31h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb31;
        text1 = "";
      }

      else if (attemptsb31 == 1) {
        document.getElementById("b31h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb31;
        text1 = "";
      }

      else if (attemptsb31 == 0) {
        document.getElementById("b31h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb31;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit31").style.display = "none";
      text = "papable";
      text1 = "&#10060; Ang papable ay matipunong lalaki.";
    }
  }

  document.getElementById("b31").innerHTML = text;
  document.getElementById("b31h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b31hint1() {
  document.getElementById("b31h").innerHTML = "May dalawang salita";
}
function b31hint2() {
  document.getElementById("b31h").innerHTML = "Katangian ng isang lalaki";
}
function b31hint3() {
  document.getElementById("b31h").innerHTML = "Sinasabi sa isang may maganda katawan at gwapo ang itsura na lalaki";
}


var attemptsb32 = 3;

function balbal32() {
  var x, text;

  x = document.getElementById("balbal32").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "gurami") {
    document.getElementById("submit32").style.display = "none";
    score++;
    text1 = "&#x2705; Ang gurami ay nangangahulugang matanda.";
    text = "";
  }

  else {
    if (attemptsb32 > 0) {
      attemptsb32--;
      if (attemptsb32 == 2) {
        document.getElementById("b32h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb32;
        text1 = "";
      }

      else if (attemptsb32 == 1) {
        document.getElementById("b32h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb32;
        text1 = "";
      }

      else if (attemptsb32 == 0) {
        document.getElementById("b32h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb32;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit32").style.display = "none";
      text = "gurami";
      text1 = "&#10060; Ang gurami ay nangangahulugang matanda.";
    }
  }

  document.getElementById("b32").innerHTML = text;
  document.getElementById("b32h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b32hint1() {
  document.getElementById("b32h").innerHTML = "May 6 na letra";
}
function b32hint2() {
  document.getElementById("b32h").innerHTML = "Kabaliktaran ng 'bata'";
}
function b32hint3() {
  document.getElementById("b32h").innerHTML = "May edad na";
}


var attemptsb33 = 3;

function balbal33() {
  var x, text;

  x = document.getElementById("balbal33").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "pampam") {
    document.getElementById("submit33").style.display = "none";
    score++;
    text1 = "&#x2705; Ang pampam ay nangangahulugang papansin.";
    text = "";
  }

  else {
    if (attemptsb33 > 0) {
      attemptsb33--;
      if (attemptsb33 == 2) {
        document.getElementById("b33h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb33;
        text1 = "";
      }

      else if (attemptsb33 == 1) {
        document.getElementById("b33h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb33;
        text1 = "";
      }

      else if (attemptsb33 == 0) {
        document.getElementById("b33h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb33;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit33").style.display = "none";
      text = "pampam";
      text1 = "&#10060; Ang pampam ay nangangahulugang papansin.";
    }
  }

  document.getElementById("b33").innerHTML = text;
  document.getElementById("b33h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b33hint1() {
  document.getElementById("b33h").innerHTML = "Katangian ng isang tao";
}
function b33hint2() {
  document.getElementById("b33h").innerHTML = "May dalawang pantig";
}
function b33hint3() {
  document.getElementById("b33h").innerHTML = "Ginagamit ang salitang ito kapag may isang tao na kulang sa pansin";
}


var attemptsb34 = 3;

function balbal34() {
  var x, text;

  x = document.getElementById("balbal34").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "sksksk") {
    document.getElementById("submit34").style.display = "none";
    score++;
    text1 = "&#x2705; Ang sksksk ay ang pagtawa nang gigil.";
    text = "";
  }

  else {
    if (attemptsb34 > 0) {
      attemptsb34--;
      if (attemptsb34 == 2) {
        document.getElementById("b34h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb34;
        text1 = "";
      }

      else if (attemptsb34 == 1) {
        document.getElementById("b34h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb34;
        text1 = "";
      }

      else if (attemptsb34 == 0) {
        document.getElementById("b34h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb34;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit34").style.display = "none";
      text = "sksksk";
      text1 = "&#10060; Ang sksksk ay ang pagtawa nang gigil.";
    }
  }

  document.getElementById("b34").innerHTML = text;
  document.getElementById("b34h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b34hint1() {
  document.getElementById("b34h").innerHTML = "Isang uri ng reaksyon";
}
function b34hint2() {
  document.getElementById("b34h").innerHTML = "Katunog ng huni ng pusa";
}
function b34hint3() {
  document.getElementById("b34h").innerHTML = "Ibang paraan ng pagtawa";
}


var attemptsb35 = 3;

function balbal35() {
  var x, text;

  x = document.getElementById("balbal35").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "chope") {
    document.getElementById("submit35").style.display = "none";
    score++;
    text1 = "&#x2705; Ang chope ay nangangahulugang torpe. Ito ang tawag sa mga taong nahihiyang umamin o manligaw sa taong nagugustuhan nila.";
    text = "";
  }

  else {
    if (attemptsb35 > 0) {
      attemptsb35--;
      if (attemptsb35 == 2) {
        document.getElementById("b35h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb35;
        text1 = "";
      }

      else if (attemptsb35 == 1) {
        document.getElementById("b35h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb35;
        text1 = "";
      }

      else if (attemptsb35 == 0) {
        document.getElementById("b35h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb35;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit35").style.display = "none";
      text = "chope";
      text1 = "&#10060; Ang chope ay nangangahulugang torpe. Ito ang tawag sa mga taong nahihiyang umamin o manligaw sa taong nagugustuhan nila.";
    }
  }

  document.getElementById("b35").innerHTML = text;
  document.getElementById("b35h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b35hint1() {
  document.getElementById("b35h").innerHTML = "Dalawang pantig";
}
function b35hint2() {
  document.getElementById("b35h").innerHTML = "Kadalasang pinanloloko sa mga lalaki";
}
function b35hint3() {
  document.getElementById("b35h").innerHTML = "Tumutukoy sa taong nahihiyang umamin sa taong nagugustuhan niya";
}


var attemptsb36 = 3;

function balbal36() {
  var x, text;

  x = document.getElementById("balbal36").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "owshi") {
    document.getElementById("submit36").style.display = "none";
    score++;
    text1 = "&#x2705; Ang ibig sabihin ng owshi ay mahal kita. Ito ang tawag sa salita upang ipahayag ang mas malalim pang nararamdaman sa isang tao.";
    text = "";
  }

  else {
    if (attemptsb36 > 0) {
      attemptsb36--;
      if (attemptsb36 == 2) {
        document.getElementById("b36h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb36;
        text1 = "";
      }

      else if (attemptsb36 == 1) {
        document.getElementById("b36h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb36;
        text1 = "";
      }

      else if (attemptsb36 == 0) {
        document.getElementById("b36h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb36;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit36").style.display = "none";
      text = "owshi";
      text1 = "&#10060; Ang ibig sabihin ng owshi ay mahal kita. Ito ang tawag sa salita upang ipahayag ang mas malalim pang nararamdaman sa isang tao.";
    }
  }

  document.getElementById("b36").innerHTML = text;
  document.getElementById("b36h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b36hint1() {
  document.getElementById("b36h").innerHTML = "Isang salitang may limang letra";
}
function b36hint2() {
  document.getElementById("b36h").innerHTML = "Sinasabi kapag mahal mo ang isang tao";
}
function b36hint3() {
  document.getElementById("b36h").innerHTML = "Katunog nito ang salitang masarap sa Nihongo";
}


var attemptsb37 = 3;

function balbal37() {
  var x, text;

  x = document.getElementById("balbal37").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "shawty") {
    document.getElementById("submit37").style.display = "none";
    score++;
    text1 = "&#x2705; Shawty ang kadalasang tinatawag sa mga babaeng na nakabibighani dala ng gandang pisikal o mapa gandang kalooban.";
    text = "";
  }

  else {
    if (attemptsb37 > 0) {
      attemptsb37--;
      if (attemptsb37 == 2) {
        document.getElementById("b37h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb37;
        text1 = "";
      }

      else if (attemptsb37 == 1) {
        document.getElementById("b37h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb37;
        text1 = "";
      }

      else if (attemptsb37 == 0) {
        document.getElementById("b37h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb37;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit37").style.display = "none";
      text = "shawty";
      text1 = "&#10060; Shawty ang kadalasang tinatawag sa mga babaeng na nakabibighani dala ng gandang pisikal o mapa gandang kalooban.";
    }
  }

  document.getElementById("b37").innerHTML = text;
  document.getElementById("b37h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b37hint1() {
  document.getElementById("b37h").innerHTML = "Binubuo ng dalawang pantig";
}
function b37hint2() {
  document.getElementById("b37h").innerHTML = "Kadalasang tinatawag sa mga babae ngayon";
}
function b37hint3() {
  document.getElementById("b37h").innerHTML = "Chics ang iba pang tawag dito";
}


var attemptsb38 = 3;

function balbal38() {
  var x, text;

  x = document.getElementById("balbal38").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "lit") {
    document.getElementById("submit38").style.display = "none";
    score++;
    text1 = "&#x2705; Ang lit ay tumutukoy sa isang bagay kung ito ay maangas o nakabibilib.";
    text = "";
  }

  else {
    if (attemptsb38 > 0) {
      attemptsb38--;
      if (attemptsb38 == 2) {
        document.getElementById("b38h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb38;
        text1 = "";
      }

      else if (attemptsb38 == 1) {
        document.getElementById("b38h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb38;
        text1 = "";
      }

      else if (attemptsb38 == 0) {
        document.getElementById("b38h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb38;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit38").style.display = "none";
      text = "lit";
      text1 = "&#10060; Ang lit ay tumutukoy sa isang bagay kung ito ay maangas o nakabibilib.";
    }
  }

  document.getElementById("b38").innerHTML = text;
  document.getElementById("b38h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b38hint1() {
  document.getElementById("b38h").innerHTML = "Isang salita lamang";
}
function b38hint2() {
  document.getElementById("b38h").innerHTML = "Binubuo ng isang pantig";
}
function b38hint3() {
  document.getElementById("b38h").innerHTML = "Pantukoy sa mga astig na bagay";
}


var attemptsb39 = 3;

function balbal39() {
  var x, text;

  x = document.getElementById("balbal39").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "paeklat") {
    document.getElementById("submit39").style.display = "none";
    score++;
    text1 = "&#x2705; Ang paeklat ay tumutukoy sa pagiging OA o sobra sa dapat na emosyong maramdaman.";
    text = "";
  }

  else {
    if (attemptsb39 > 0) {
      attemptsb39--;
      if (attemptsb39 == 2) {
        document.getElementById("b39h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb39;
        text1 = "";
      }

      else if (attemptsb39 == 1) {
        document.getElementById("b39h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb39;
        text1 = "";
      }

      else if (attemptsb39 == 0) {
        document.getElementById("b39h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb39;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit39").style.display = "none";
      text = "paeklat";
      text1 = "&#10060; Ang paeklat ay tumutukoy sa pagiging OA o sobra sa dapat na emosyong maramdaman.";
    }
  }

  document.getElementById("b39").innerHTML = text;
  document.getElementById("b39h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b39hint1() {
  document.getElementById("b39h").innerHTML = "Binubuo ng tatlong pantig";
}
function b39hint2() {
  document.getElementById("b39h").innerHTML = "Nangangahulugang sobra sa dapat na emosyong maramdaman";
}
function b39hint3() {
  document.getElementById("b39h").innerHTML = "Katunog ng peklat";
}


var attemptsb40 = 3;

function balbal40() {
  var x, text;

  x = document.getElementById("balbal40").value;

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
    text1 = "";
  } 

  else if (l_case == "waswas") {
    document.getElementById("submit40").style.display = "none";
    score++;
    text1 = "&#x2705; Ang waswas ay tumutukoy sa salitang asawa.";
    text = "";
  }

  else {
    if (attemptsb40 > 0) {
      attemptsb40--;
      if (attemptsb40 == 2) {
        document.getElementById("b40h1").style.visibility = "visible";
        text = "&#10060; Attempts = " + attemptsb40;
        text1 = "";
      }

      else if (attemptsb40 == 1) {
        document.getElementById("b40h2").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb40;
        text1 = "";
      }

      else if (attemptsb40 == 0) {
        document.getElementById("b40h3").style.visibility = "visible";
        text = "&#10060; Attempt = " + attemptsb40;
        text1 = "";
      }
    }

    else {
      document.getElementById("submit40").style.display = "none";
      text = "waswas";
      text1 = "&#10060; Ang waswas ay tumutukoy sa salitang asawa.";
    }
  }

  document.getElementById("b40").innerHTML = text;
  document.getElementById("b40h").innerHTML = text1;
  document.getElementById("score").innerHTML = "Score: " + score;
}

function b40hint1() {
  document.getElementById("b40h").innerHTML = "Katunog ng salitang hugas sa ingles";
}
function b40hint2() {
  document.getElementById("b40h").innerHTML = "Ang unang pantig ay past tense ng 'is'";
}
function b40hint3() {
  document.getElementById("b40h").innerHTML = "Magkatulad bigkasin ang unang pantig at ikalawang pantig";
}


function finalScore() {

  document.getElementById("slideshow-inner").style.display = "none";
  document.getElementById("hidden").style.display = "flex";

  if (score < 8) {
    document.getElementById("next").style.display = "none";
    document.getElementById("h1").innerHTML = "8 dapat, ulit ka nalang";
    document.getElementById("myScore").innerHTML = "Ang iyong score ay " + score;
  }

  else {
    document.getElementById("h1").innerHTML = "Yey, pasado ka!";
    document.getElementById("myScore").innerHTML = "Ang iyong score ay " + score;
  }
}
