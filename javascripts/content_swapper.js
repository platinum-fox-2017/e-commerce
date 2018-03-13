let content = [
  {
    release_category: 'RECENTLY RELEASED',
    title: 'MONSTER HUNTER WORLD',
    platform: 'PS4, XBOXONE',
    release_date : 'JANUARY 26, 2018',
    publisher_developer: 'CAPCOM',
    desc: 'Making the jump from 3DS to current-gen consoles, Capcom is set to launch the latest entry in the Monster Hunter franchise: Monster Hunter World. Will the critics be impressed by the classic Monster Hunter gameplay mixed with a gorgeous environment and seamless game systems?'
  },
  {
    release_category: 'RECENTLY RELEASED',
    title: 'SHADOW OF THE COLOSSUS',
    platform: 'PS4',
    release_date : 'FEBUARY 26, 2018',
    publisher_developer: 'BLUEPOINT GAMES, SIE JAPAN STUDIO, SONY',
    desc: 'Launching over 12 years ago to glowing reviews, SCE Japan is now set to debut a version made for the PS4 and PS4 Pro. With The Last Guardian receiving Strong reviews just over a year ago, will this faithful prequel remake maintain its impact?'
  },
  {
    release_category: 'RECENTLY RELEASED',
    title: 'CIVILIZATION VI: RISE AND FALL',
    platform: 'PC',
    release_date : 'FEBUARY 26, 2018',
    publisher_developer: '2K GAMES, FIRAXIS GAMES',
    desc: `Civilization 5's expansions helped transform a good game into a timeless classic. Now, two years after its release, Firaxis Games hopes to build upon the early success of Civilization 6 with its latest expansion, "Rise and Fall."`
  }
]
function slideshowContent(){
  let index = 0;
  document.querySelectorAll('.release-category h4')[0].innerHTML = content[index].release_category;
  document.querySelectorAll('.game-title h1')[0].innerHTML = content[index].title;
  document.querySelectorAll('.platform h4')[0].innerHTML = content[index].platform;
  document.querySelectorAll('.release-date h5')[0].innerHTML = content[index].release_date;
  document.querySelectorAll('.publisher-developer h5')[0].innerHTML = content[index].publisher_developer;
  document.querySelectorAll('.game-desc')[0].innerHTML = content[index].desc;
  index += 1;
  setInterval(function(){
    // console.log(index);
    // console.log(document.querySelectorAll('.game-title h1')[0].innerHTML);
    let reset = false
    if (index === 3) {
      index = 0
      reset = true
    }

    document.querySelectorAll('.release-category h4')[0].innerHTML = content[index].release_category;
    document.querySelectorAll('.game-title h1')[0].innerHTML = content[index].title;
    document.querySelectorAll('.platform h4')[0].innerHTML = content[index].platform;
    document.querySelectorAll('.release-date h5')[0].innerHTML = content[index].release_date;
    document.querySelectorAll('.publisher-developer h5')[0].innerHTML = content[index].publisher_developer;
    document.querySelectorAll('.game-desc')[0].innerHTML = content[index].desc;

    if (reset) {
      reset = false
    } else {
      index +=1
    }

  }, 4000)
}
slideshowContent()
