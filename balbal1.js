
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


function balbal1() {
  var x, text;

  x = document.getElementById("balbal1").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "starbs") {
    text = "&#x2705;  Ang starbs ay nangangahulugang pakopya.";
  }
  else {
    text = "&#10060;  Ang starbs ay nangangahulugang pakopya.";
  }

  document.getElementById("b1").innerHTML = text;
}

function b1hint1() {
  document.getElementById("b1").innerHTML = "May anim na letra";
}
function b1hint2() {
  document.getElementById("b1").innerHTML = "Madalas gawin sa eskwelahan";
}
function b1hint3() {
  document.getElementById("b1").innerHTML = "Gawain mo kapag walang takdang aralin";
}


function balbal2() {
  var x, text;

  x = document.getElementById("balbal2").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "sags") {
    text = "&#x2705;   Ang sags ay nangangahulugang pilit.";
  }
  else {
    text = "&#10060;   Ang sags ay nangangahulugang pilit.";
  }

  document.getElementById("b2").innerHTML = text;
}

function b2hint1() {
  document.getElementById("b2").innerHTML = "May apat na letra";
}
function b2hint2() {
  document.getElementById("b2").innerHTML = "Madalas mong gawin kapag nagpipinta";
}
function b2hint3() {
  document.getElementById("b2").innerHTML = "Ginagawa mo kapag wala kang gana";
}


function balbal3() {
  var x, text;

  x = document.getElementById("balbal3").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "pics") {
    text = "&#x2705;   Ang pics ay nangangahulugang go ako.";
  }
  else {
    text = "&#10060;   Ang pics ay nangangahulugang go ako.";
  }

  document.getElementById("b3").innerHTML = text;
}

function b3hint1() {
  document.getElementById("b3").innerHTML = "May apat na letra";
}
function b3hint2() {
  document.getElementById("b3").innerHTML = "Madalas mangyari kapag may pupuntahan";
}
function b3hint3() {
  document.getElementById("b3").innerHTML = "Lagi mong sinasabi kapag pinayagan ka";
}


function balbal4() {
  var x, text;

  x = document.getElementById("balbal4").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "carps") {
    text = "&#x2705;   Ang carps ay ang pagtatanong kung game ka ba.";
  }
  else {
    text = "&#10060;   Ang carps ay ang pagtatanong kung game ka ba.";
  }

  document.getElementById("b4").innerHTML = text;
}

function b4hint1() {
  document.getElementById("b4").innerHTML = "May limang letra";
}
function b4hint2() {
  document.getElementById("b4").innerHTML = "Madalas itanong kapag inaakit ka";
}
function b4hint3() {
  document.getElementById("b4").innerHTML = "Patok din ito kapag magbobonding";
}


function balbal5() {
  var x, text;

  x = document.getElementById("balbal5").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "sharks") {
    text = "&#x2705;   Ang sharks ay nangangahulugang patingin.";
  }
  else {
    text = "&#10060;   Ang sharks ay nangangahulugang patingin.";
  }

  document.getElementById("b5").innerHTML = text;
}

function b5hint1() {
  document.getElementById("b5").innerHTML = "May anim na letra";
}
function b5hint2() {
  document.getElementById("b5").innerHTML = "Madalas mangyari sa eskwelahan";
}
function b5hint3() {
  document.getElementById("b5").innerHTML = "May bagong ballpen ang kaklase mo";
}


function balbal6() {
  var x, text;

  x = document.getElementById("balbal6").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "scoobs") {
    text = "&#x2705;   Ang scoobs ay nangangahulugang hindi.";
  }
  else {
    text = "&#10060;   Ang scoobs ay nangangahulugang hindi.";
  }

  document.getElementById("b6").innerHTML = text;
}

function b6hint1() {
  document.getElementById("b6").innerHTML = "May anim na letra";
}
function b6hint2() {
  document.getElementById("b6").innerHTML = "Katunog ng isang sikat na dog cartoon character";
}
function b6hint3() {
  document.getElementById("b6").innerHTML = "Paraan ng pagtanggi";
}


function balbal7() {
  var x, text;

  x = document.getElementById("balbal7").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "salt") {
    text = "&#x2705;   Ang salt ay nangangahulugang talaga.";
  }
  else {
    text = "&#10060;   Ang salt ay nangangahulugang talaga.";
  }

  document.getElementById("b7").innerHTML = text;
}

function b7hint1() {
  document.getElementById("b7").innerHTML = "May apat na letra";
}
function b7hint2() {
  document.getElementById("b7").innerHTML = "Salitang naglalahad ng pagsang-ayon";
}
function b7hint3() {
  document.getElementById("b7").innerHTML = "Madalas sabihin kapag may pagdududa";
}


function balbal8() {
  var x, text;

  x = document.getElementById("balbal8").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "tea") {
    text = "&#x2705;   Ang tea ay nangangahulugang tsismis.";
  }
  else {
    text = "&#10060;   Ang tea ay nangangahulugang tsismis.";
  }

  document.getElementById("b8").innerHTML = text;
}

function b8hint1() {
  document.getElementById("b8").innerHTML = "May tatlong letra";
}
function b8hint2() {
  document.getElementById("b8").innerHTML = "Kadalasang tawag sa 'chismis'";
}
function b8hint3() {
  document.getElementById("b8").innerHTML = "Mainam na inumin tuwing umaga";
}


function balbal9() {
  var x, text;

  x = document.getElementById("balbal9").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "salty") {
    text = "&#x2705;   Ang salty ay tumutukoy sa taong barinuhin.";
  }
  else {
    text = "&#10060;   Ang salty ay tumutukoy sa taong barinuhin.";
  }

  document.getElementById("b9").innerHTML = text;
}

function b9hint1() {
  document.getElementById("b9").innerHTML = "May limang letra";
}
function b9hint2() {
  document.getElementById("b9").innerHTML = "Sangkap sa pagluluto";
}
function b9hint3() {
  document.getElementById("b9").innerHTML = "Katangian ng isang tao na may koneksyon sa mainitin ang ulo";
}


function balbal10() {
  var x, text;

  x = document.getElementById("balbal10").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "bop") {
    text = "&#x2705;   Ang bop tumutukoy sa magandang kanta na mapapasayaw ka.";
  }
  else {
    text = "&#10060;   Ang bop tumutukoy sa magandang kanta na mapapasayaw ka.";
  }

  document.getElementById("b10").innerHTML = text;
}

function b10hint1() {
  document.getElementById("b10").innerHTML = "May tatlong letra";
}
function b10hint2() {
  document.getElementById("b10").innerHTML = "Kasing tunog ng salitang 'pop'";
}
function b10hint3() {
  document.getElementById("b10").innerHTML = "Ang salitang ito ay may kaugnayan sa isang magandang kanta";
}


function balbal11() {
  var x, text;

  x = document.getElementById("balbal11").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "timbs") {
    text = "&#x2705;   Ang timbs ay pagtatanong ng bakit.";
  }
  else {
    text = "&#10060;   Ang timbs ay pagtatanong ng bakit.";
  }

  document.getElementById("b11").innerHTML = text;
}

function b11hint1() {
  document.getElementById("b11").innerHTML = "May limang letra";
}
function b11hint2() {
  document.getElementById("b11").innerHTML = "Malapit sa salitang 'timba'";
}
function b11hint3() {
  document.getElementById("b11").innerHTML = "Ang salitang ito ay may kaugnayan sa katagang sinasabi sa pagtatanong ng dahilan";
}


function balbal12() {
  var x, text;

  x = document.getElementById("balbal12").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "awit") {
    text = "&#x2705;   Ang awit ay pinagsamang aw at sakit.";
  }
  else {
    text = "&#10060;   Ang awit ay pinagsamang aw at sakit.";
  }

  document.getElementById("b12").innerHTML = text;
}

function b12hint1() {
  document.getElementById("b12").innerHTML = "May apat na letra";
}
function b12hint2() {
  document.getElementById("b12").innerHTML = "Kadalasang sinasabi ng mga kabataan";
}
function b12hint3() {
  document.getElementById("b12").innerHTML = "Ang salitang ito ay may kaugnayan sa musika";
}


function balbal13() {
  var x, text;

  x = document.getElementById("balbal13").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "achoo") {
    text = "&#x2705;   Ang achoo ay tumutukoy sa baklang mukhang straight.";
  }
  else {
    text = "&#10060;   Ang achoo ay tumutukoy sa baklang mukhang straight.";
  }

  document.getElementById("b13").innerHTML = text;
}

function b13hint1() {
  document.getElementById("b13").innerHTML = "May limang letra";
}
function b13hint2() {
  document.getElementById("b13").innerHTML = "Ito ay ekspresyon na nababanggit tuwing nababahing ang isang tao";
}
function b13hint3() {
  document.getElementById("b13").innerHTML = "Kasing tunog ng tunog ng sasakyang tren";
}


function balbal14() {
  var x, text;

  x = document.getElementById("balbal14").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "tsimay") {
    text = "&#x2705;   Ang tsimay ay tumutukoy sa katulong.";
  }
  else {
    text = "&#10060;   Ang tsimay ay tumutukoy sa katulong.";
  }

  document.getElementById("b14").innerHTML = text;
}

function b14hint1() {
  document.getElementById("b14").innerHTML = "May 6 letra";
}
function b14hint2() {
  document.getElementById("b14").innerHTML = "Kasing tunog ng salitang 'kamay'";
}
function b14hint3() {
  document.getElementById("b14").innerHTML = "Kadalasang gumagawa ng gawaing bahay";
}


function balbal15() {
  var x, text;

  x = document.getElementById("balbal15").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "gumps") {
    text = "&#x2705;   Ang gumps ay nangangahulugang salamat.";
  }
  else {
    text = "&#10060;   Ang gumps ay nangangahulugang salamat.";
  }

  document.getElementById("b15").innerHTML = text;
}

function b15hint1() {
  document.getElementById("b15").innerHTML = "Pagbati";
}
function b15hint2() {
  document.getElementById("b15").innerHTML = "May limang letra";
}
function b15hint3() {
  document.getElementById("b15").innerHTML = "Ito ay sinasabi matapos tulungan ang isang tao";
}


function balbal16() {
  var x, text;

  x = document.getElementById("balbal16").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "pots") {
    text = "&#x2705;   Ang pots ay nangangahulugang okay.";
  }
  else {
    text = "&#10060;   Ang pots ay nangangahulugang okay.";
  }

  document.getElementById("b16").innerHTML = text;
}

function b16hint1() {
  document.getElementById("b16").innerHTML = "Pagtugon";
}
function b16hint2() {
  document.getElementById("b16").innerHTML = "May apat na letra";
}
function b16hint3() {
  document.getElementById("b16").innerHTML = "Ginagamit upang ipahiwatig ang pagsang-ayon sa isang bagay";
}


function balbal17() {
  var x, text;

  x = document.getElementById("balbal17").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "caps") {
    text = "&#x2705;   Ang caps ay nangangahulugang hindi totoo.";
  }
  else {
    text = "&#10060;   Ang caps ay nangangahulugang hindi totoo.";
  }

  document.getElementById("b17").innerHTML = text;
}

function b17hint1() {
  document.getElementById("b17").innerHTML = "Kabaliktaran ng katotohan";
}
function b17hint2() {
  document.getElementById("b17").innerHTML = "May apat na letra";
}
function b17hint3() {
  document.getElementById("b17").innerHTML = "Ito ay kawalan ng katunayan";
}


function balbal18() {
  var x, text;

  x = document.getElementById("balbal18").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "sus") {
    text = "&#x2705;   Ang sus ay nangangahulugang kahina-hinala.";
  }
  else {
    text = "&#10060;   Ang sus ay nangangahulugang kahina-hinala.";
  }

  document.getElementById("b18").innerHTML = text;
}

function b18hint1() {
  document.getElementById("b18").innerHTML = "Kilos ng isang tao";
}
function b18hint2() {
  document.getElementById("b18").innerHTML = "May tatlo na letra";
}
function b18hint3() {
  document.getElementById("b18").innerHTML = "Ang salitang ito ay may koneksiyon sa hindi mapaniniwalaan na kilos ng isang tao";
}


function balbal19() {
  var x, text;

  x = document.getElementById("balbal19").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "mom jeans") {
    text = "&#x2705;   Ang mom jeans ay tumutukoy sa taong sabog.";
  }
  else {
    text = "&#10060;   Ang mom jeans ay tumutukoy sa taong sabog.";
  }

  document.getElementById("b19").innerHTML = text;
}

function b19hint1() {
  document.getElementById("b19").innerHTML = "Mayroong malakas na tunog";
}
function b19hint2() {
  document.getElementById("b19").innerHTML = "Dalawang salita at nagkakaroon ng walong letra";
}
function b19hint3() {
  document.getElementById("b19").innerHTML = "Maaaring ipahiwating na wala sa sarili o kaya ay ito ay kadalasang naririnig sa giyera";
}


function balbal20() {
  var x, text;

  x = document.getElementById("balbal20").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "kopong-kopong") {
    text = "&#x2705;   Ang kopong-kopong ay nangangahulugang makaluma.";
  }
  else {
    text = "&#10060;   Ang kopong-kopong ay nangangahulugang makaluma.";
  }

  document.getElementById("b20").innerHTML = text;
}

function b20hint1() {
  document.getElementById("b20").innerHTML = "Katunog ng ikalawang pantig sa tawag ng mga chinese sa larong table tennis";
}
function b20hint2() {
  document.getElementById("b20").innerHTML = "Nauulit na salita at nagkakaroon ng labindalawa na letra";
}
function b20hint3() {
  document.getElementById("b20").innerHTML = "Maaaring mainhalintulad sa antigong bagay, datihan at unang panahon";
}


function balbal21() {
  var x, text;

  x = document.getElementById("balbal21").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "boujee") {
    text = "&#x2705;   Ang boujee ay nangangahulugang sosyal.";
  }
  else {
    text = "&#10060;   Ang boujee ay nangangahulugang sosyal.";
  }

  document.getElementById("b21").innerHTML = text;
}

function b21hint1() {
  document.getElementById("b21").innerHTML = "Katangian ng isang indibidwal";
}
function b21hint2() {
  document.getElementById("b21").innerHTML = "Mamahalin ang mga binibili";
}
function b21hint3() {
  document.getElementById("b21").innerHTML = "Magarang uri ng pamumuhay";
}


function balbal22() {
  var x, text;

  x = document.getElementById("balbal22").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "temakats") {
    text = "&#x2705;   Ang temakats ay nangangahulugang makati.";
  }
  else {
    text = "&#10060;   Ang temakats ay nangangahulugang makati.";
  }

  document.getElementById("b22").innerHTML = text;
}

function b22hint1() {
  document.getElementById("b22").innerHTML = "Katunog ng isang lugar sa NCR";
}
function b22hint2() {
  document.getElementById("b22").innerHTML = "Maaaring resulta ng pagkagat ng isang insekto";
}
function b22hint3() {
  document.getElementById("b22").innerHTML = "Kinakamot";
}


function balbal23() {
  var x, text;

  x = document.getElementById("balbal23").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "awpit") {
    text = "&#x2705;   Ang awpit ay pinagsamang aw at pangit.";
  }
  else {
    text = "&#10060;   Ang awpit ay pinagsamang aw at pangit.";
  }

  document.getElementById("b23").innerHTML = text;
}

function b23hint1() {
  document.getElementById("b23").innerHTML = "Pinagsamang salita";
}
function b23hint2() {
  document.getElementById("b23").innerHTML = "Ang unang pantig ay tunog na nagmumula sa aso";
}
function b23hint3() {
  document.getElementById("b23").innerHTML = "Ang ikalawang pantig ay mula sa salitang tumutukoy sa hindi kaaya-ayang itsura.";
}

function balbal24() {
  var x, text;

  x = document.getElementById("balbal24").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "borlog") {
    text = "&#x2705;   Ang borlog ay nangangahulugang tulog.";
  }
  else {
    text = "&#10060;   Ang borlog ay nangangahulugang tulog.";
  }

  document.getElementById("b24").innerHTML = text;
}

function b24hint1() {
  document.getElementById("b24").innerHTML = "Walang nalalaman";
}
function b24hint2() {
  document.getElementById("b24").innerHTML = "Nakapikit";
}
function b24hint3() {
  document.getElementById("b24").innerHTML = "Minsan humihilik";
}


function balbal25() {
  var x, text;

  x = document.getElementById("balbal25").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "ebubot") {
    text = "&#x2705;   Ang ebubot ay babae.";
  }
  else {
    text = "&#10060;   Ang ebubot ay babae.";
  }

  document.getElementById("b25").innerHTML = text;
}

function b25hint1() {
  document.getElementById("b25").innerHTML = "Mahaba ang buhok";
}
function b25hint2() {
  document.getElementById("b25").innerHTML = "Mataas ang boses";
}
function b25hint3() {
  document.getElementById("b25").innerHTML = "Kasarian na kabaliktaran ng lalaki";
}


function balbal26() {
  var x, text;

  x = document.getElementById("balbal26").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "epalas") {
    text = "&#x2705;   Ang epalas ay salapi.";
  }
  else {
    text = "&#10060;   Ang epalas ay salapi.";
  }

  document.getElementById("b26").innerHTML = text;
}

function b26hint1() {
  document.getElementById("b26").innerHTML = "Mahalaga";
}
function b26hint2() {
  document.getElementById("b26").innerHTML = "May iba’t ibang kulay";
}
function b26hint3() {
  document.getElementById("b26").innerHTML = "Pinambabayad";
}


function balbal27() {
  var x, text;

  x = document.getElementById("balbal27").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "tospik") {
    text = "&#x2705;   Ang tospik ay sapatos.";
  }
  else {
    text = "&#10060;   Ang tospik ay sapatos.";
  }

  document.getElementById("b27").innerHTML = text;
}

function b27hint1() {
  document.getElementById("b27").innerHTML = "Kasama kahit saan pumunta";
}
function b27hint2() {
  document.getElementById("b27").innerHTML = "Kalimitang kinikolekta ng mga manlalaro";
}
function b27hint3() {
  document.getElementById("b27").innerHTML = "Sinusuot sa parting paa";
}


function balbal28() {
  var x, text;

  x = document.getElementById("balbal28").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "sondo") {
    text = "&#x2705;   Ang sondo ay piso.";
  }
  else {
    text = "&#10060;   Ang sondo ay piso.";
  }

  document.getElementById("b28").innerHTML = text;
}

function b28hint1() {
  document.getElementById("b28").innerHTML = "Kasingtunog ng 'sando'";
}
function b28hint2() {
  document.getElementById("b28").innerHTML = "Isang uri ng pera";
}
function b28hint3() {
  document.getElementById("b28").innerHTML = "Katumbas ng 100 sentimos";
}


function balbal29() {
  var x, text;

  x = document.getElementById("balbal29").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "mateluk") {
    text = "&#x2705;   Ang mateluk ay nangangahulugang makulit.";
  }
  else {
    text = "&#10060;   Ang mateluk ay nangangahulugang makulit.";
  }

  document.getElementById("b29").innerHTML = text;
}

function b29hint1() {
  document.getElementById("b29").innerHTML = "May pitong na letra";
}
function b29hint2() {
  document.getElementById("b29").innerHTML = "Kadalasang sinasabi sa mga bata";
}
function b29hint3() {
  document.getElementById("b29").innerHTML = "Hindi mapakali o pagiging mapaglaro";
}


function balbal30() {
  var x, text;

  x = document.getElementById("balbal30").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "taratitat") {
    text = "&#x2705;   Ang taratitat ay nangangahulugang madaldal.";
  }
  else {
    text = "&#10060;   Ang taratitat ay nangangahulugang madaldal.";
  }

  document.getElementById("b30").innerHTML = text;
}

function b30hint1() {
  document.getElementById("b30").innerHTML = "Isang katangian ng tao";
}
function b30hint2() {
  document.getElementById("b30").innerHTML = "Hindi nauubusan ng sasabihin";
}
function b30hint3() {
  document.getElementById("b30").innerHTML = "Masalita";
}


function balbal31() {
  var x, text;

  x = document.getElementById("balbal31").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "papable") {
    text = "&#x2705;   Ang papable ay matipunong lalaki.";
  }
  else {
    text = "&#10060;   Ang papable ay matipunong lalaki.";
  }

  document.getElementById("b31").innerHTML = text;
}

function b31hint1() {
  document.getElementById("b31").innerHTML = "May dalawang salita";
}
function b31hint2() {
  document.getElementById("b31").innerHTML = "Katangian ng isang lalaki";
}
function b31hint3() {
  document.getElementById("b31").innerHTML = "Sinasabi sa isang may maganda katawan at gwapo ang itsura na lalaki";
}


function balbal32() {
  var x, text;

  x = document.getElementById("balbal32").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "gurami") {
    text = "&#x2705;   Ang gurami ay nangangahulugang matanda.";
  }
  else {
    text = "&#10060;   Ang gurami ay nangangahulugang matanda.";
  }

  document.getElementById("b32").innerHTML = text;
}

function b32hint1() {
  document.getElementById("b32").innerHTML = "May 6 na letra";
}
function b32hint2() {
  document.getElementById("b32").innerHTML = "Kabaliktaran ng 'bata'";
}
function b32hint3() {
  document.getElementById("b32").innerHTML = "May edad na";
}


function balbal33() {
  var x, text;

  x = document.getElementById("balbal33").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "pampam") {
    text = "&#x2705;   Ang pampam ay nangangahulugang papansin.";
  }
  else {
    text = "&#10060;   Ang pampam ay nangangahulugang papansin.";
  }

  document.getElementById("b33").innerHTML = text;
}

function b33hint1() {
  document.getElementById("b33").innerHTML = "Katangian ng isang tao";
}
function b33hint2() {
  document.getElementById("b33").innerHTML = "May dalawang pantig";
}
function b33hint3() {
  document.getElementById("b33").innerHTML = "Ginagamit ang salitang ito kapag may isang tao na kulang sa pansin";
}


function balbal34() {
  var x, text;

  x = document.getElementById("balbal34").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "ksksks") {
    text = "&#x2705;   Ang ksksks ay ang pagtawa nang gigil.";
  }
  else {
    text = "&#10060;   Ang ksksks ay ang pagtawa nang gigil.";
  }

  document.getElementById("b34").innerHTML = text;
}

function b34hint1() {
  document.getElementById("b34").innerHTML = "Isang uri ng reaksyon";
}
function b34hint2() {
  document.getElementById("b34").innerHTML = "Katunog ng huni ng pusa";
}
function b34hint3() {
  document.getElementById("b34").innerHTML = "Ibang paraan ng pagtawa";
}


function balbal35() {
  var x, text;

  x = document.getElementById("balbal35").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "chope") {
    text = "&#x2705;   Ang chope ay nangangahulugang torpe. Ito ang tawag sa mga taong nahihiyang umamin o manligaw sa taong nagugustuhan nila.";
  }
  else {
    text = "&#10060;   Ang chope ay nangangahulugang torpe. Ito ang tawag sa mga taong nahihiyang umamin o manligaw sa taong nagugustuhan nila.";
  }

  document.getElementById("b35").innerHTML = text;
}

function b35hint1() {
  document.getElementById("b35").innerHTML = "Dalawang pantig";
}
function b35hint2() {
  document.getElementById("b35").innerHTML = "Kadalasang pinanloloko sa mga lalaki";
}
function b35hint3() {
  document.getElementById("b35").innerHTML = "Tumutukoy sa taong nahihiyang umamin sa taong nagugustuhan niya";
}


function balbal36() {
  var x, text;

  x = document.getElementById("balbal36").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "owshi") {
    text = "&#x2705;   Ang ibigsabihin ng owshi ay mahal kita. Ito ang tawag sa salita upang ipahayag ang mas malalim pang nararamdaman sa isang tao.";
  }
  else {
    text = "&#10060;   Ang ibigsabihin ng owshi ay mahal kita. Ito ang tawag sa salita upang ipahayag ang mas malalim pang nararamdaman sa isang tao.";
  }

  document.getElementById("b36").innerHTML = text;
}

function b36hint1() {
  document.getElementById("b36").innerHTML = "Isang salitang may limang letra";
}
function b36hint2() {
  document.getElementById("b36").innerHTML = "Sinasabi kapag mahal mo ang isang tao";
}
function b36hint3() {
  document.getElementById("b36").innerHTML = "Katunog nito ang salitang masarap sa Nihongo";
}


function balbal37() {
  var x, text;

  x = document.getElementById("balbal37").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "shawty") {
    text = "&#x2705;   Shawty ang kadalasang tinatawag sa mga babaeng na nakabibighani dala ng gandang pisikal o mapa gandang kalooban.";
  }
  else {
    text = "&#10060;   Shawty ang kadalasang tinatawag sa mga babaeng na nakabibighani dala ng gandang pisikal o mapa gandang kalooban.";
  }

  document.getElementById("b37").innerHTML = text;
}

function b37hint1() {
  document.getElementById("b37").innerHTML = "Binubuo ng dalawang pantig";
}
function b37hint2() {
  document.getElementById("b37").innerHTML = "Kadalasang tinatawag sa mga babae ngayon";
}
function b37hint3() {
  document.getElementById("b37").innerHTML = "Chics ang iba pang tawag dito";
}

function balbal38() {
  var x, text;

  x = document.getElementById("balbal38").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "lit") {
    text = "&#x2705;   Ang lit ay tumutukoy sa isang bagay kung ito ay maangas o nakabibilib.";
  }
  else {
    text = "&#10060;   Ang lit ay tumutukoy sa isang bagay kung ito ay maangas o nakabibilib.";
  }

  document.getElementById("b38").innerHTML = text;
}

function b38hint1() {
  document.getElementById("b38").innerHTML = "Isang salita lamang";
}
function b38hint2() {
  document.getElementById("b38").innerHTML = "Binubuo ng isang pantig";
}
function b38hint3() {
  document.getElementById("b38").innerHTML = "Pantukoy sa mga astig na bagay";
}


function balbal39() {
  var x, text;

  x = document.getElementById("balbal39").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "paeklat") {
    text = "&#x2705;   Ang paeklat ay tumutukoy sa pagiging OA o sobra sa dapat na emosyong maramdaman.";
  }
  else {
    text = "&#10060;   Ang paeklat ay tumutukoy sa pagiging OA o sobra sa dapat na emosyong maramdaman.";
  }

  document.getElementById("b39").innerHTML = text;
}

function b39hint1() {
  document.getElementById("b39").innerHTML = "Binubuo ng tatlong pantig";
}
function b39hint2() {
  document.getElementById("b39").innerHTML = "Nangangahulugang sobra sa dapat na emosyong maramdaman";
}
function b39hint3() {
  document.getElementById("b39").innerHTML = "Katunog ng peklat";
}


function balbal40() {
  var x, text;

  x = document.getElementById("balbal40").value

  l_case = x.toLowerCase();

  if (l_case == "") {
    text = "Punan ang patlang ng salitang balbal.";
  } else if (l_case == "waswas") {
    text = "&#x2705;   Ang waswas ay tumutukoy sa salitang asawa.";
  }
  else {
    text = "&#10060;   Ang waswas ay tumutukoy sa salitang asawa.";
  }

  document.getElementById("b40").innerHTML = text;
}

function b40hint1() {
  document.getElementById("b40").innerHTML = "Mayroong anim na letra";
}
function b40hint2() {
  document.getElementById("b40").innerHTML = "Magkatulad bigkasin ang unang pantig at ikalawang pantig";
}
function b40hint3() {
  document.getElementById("b40").innerHTML = "Katunog ng salitang hugas sa ingles";
}
