const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const banners = $$('.myBanner')
const plus = $$('.guest__option-plus')
const guest = $('.header__search-guest')
const guestOption = $('.guest__option')
const proLocationItems = $$('.proLocation-item')
const proLocationList = $('.proLocation-list')
const sections =  $$('section')


var app = {

    // Banner swiper
    banner : function() {
        const swiper = new Swiper('.swiper', {
          // Optional parameters
          // direction: 'vertical',
          loop: true,
          effect : 'slide' ,
        
          // If we need pagination
          pagination: {
            el: '.swiper-pagination',
          },
        
          navigation: {
          
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        
          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        });
    },

    //  Xử lý click prev , next địa điểm nổi bật

    locationFuntion : function() {
      const prevBtn = $('.proLocation .prev')
      const nextBtn = $('.proLocation .next')
      var counter = 0;
      const size = proLocationItems[0].clientWidth
      prevBtn.classList.add('disabled')
        // Xử lý click prev , next 
        prevBtn.onclick = function() 
        {
            counter--
            if(counter < 0)
            {
                counter = 0 ; 
                return;
            }
            else
            {
              proLocationList.style.transition = 'transform 0.4s ease-in-out'
              proLocationList.style.transform = 'translateX('+ (counter*(-size - 18)) +'px)'; 
              if(counter === 0)
              {
                prevBtn.classList.add('disabled')
              }
              nextBtn.classList.remove('disabled')
            }
  
            
        }
        nextBtn.onclick = function() 
        { 
          counter++
          if(counter > proLocationItems.length - 5)
          {
              counter = proLocationItems.length - 5 ; 
              return;
          }
          else
          {
            proLocationList.style.transition = 'transform 0.4s ease-in-out'
            proLocationList.style.transform = 'translateX('+ (counter*-(size + 18)) +'px)'; 
            if(counter === proLocationItems.length - 5 )
            {
              nextBtn.classList.add('disabled')
            }
             prevBtn.classList.remove('disabled')
          }
  
        }
    },

    handleEvents:function(){
      const _this = this ;
      // Xử lý khi click vào số khách
        guest.onclick = function(){
            guest.classList.toggle('active')
        }

      // Xử lý khi click ra ngoài số khách
      window.onclick = function(e){
        if(!e.target.matches('.header__search-guest, .header__search-guest-icon ,.header__search-guest-text'))
        {
            if(guest.classList.contains('active'))
            {
                guest.classList.remove('active');
            }
        }
      }

      // Xử lý initial
      window.onscroll = function(){
        const triggerBottom = window.innerHeight /6 * 5 ;
        sections.forEach(section => {
          const boxTop = section.getBoundingClientRect().top ;
          console.log(triggerBottom,boxTop)
          if(boxTop < triggerBottom)
          {
              section.classList.add('show')
          }
        })
      }
    },
    

    start : function() {
        this.handleEvents();
        this.banner();
        this.locationFuntion();
    }
}

app.start();

