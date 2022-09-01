const heroes = [
  {
    name: 'Clay More',
    type: 'Warrior',
    damage: 5,
    health: 100,
    level: 1,
    gold: 0,
    picture: 'https://orna.guide/static/orna/img/packs/nothren/2_m.png',
  },
  {
    name: 'Werlin Spinn',
    type: 'Mage',
    damage: 40,
    health: 50,
    level: 3,
    gold: 0,
    picture: 'https://orna.guide/static/orna/img/packs/avalon/mage_m.png',
  },
  {
    name: 'Rob Banks',
    type: 'Thief',
    damage: 30,
    health: 75,
    level: 5,
    steal: 10,
    gold: 0,
    picture: 'https://orna.guide/static/orna/img/packs/annwn/rogue_f.png',
  },
];
const boss = {
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
};

// ElementId's
let heroTable = document.getElementById('hero-table');
let heroHP = document.getElementById('hero-health');
let bossHP = document.getElementById('boss-health');
let bossLVL = document.getElementById('boss-level');
// ARRAY ITEMS
let heroGold = document.getElementById('hero-gold');
let warrior = heroes.find((hero) => hero.type == 'Warrior');
let thief = heroes.find((hero) => hero.type == 'Thief');
let mage = heroes.find((hero) => hero.type == 'Mage');
const currentParty = [warrior];
let interval = null
// -----------------------
let bossAttackInterval = 0;
// --------------

// #region ATTACKS
function warriorAttack() {
  boss.health -= warrior.damage;
  bossHP.innerText = boss.health;

  bossLevelUp();
  
 
 
}
function mageAttack() {
  boss.health -= mage.damage;
  bossHP.innerText = boss.health;

  bossLevelUp();
  
 
 
}
function thiefAttack() {
  boss.health -= thief.damage;
  bossHP.innerText = boss.health;

  bossLevelUp();
  
 
 
}


function attack(type) {
  switch (type) {
    case 'Warrior':
      warriorAttack();
      break;
    case 'Mage':
      mageAttack();
      break;
    case 'Thief':
      thiefAttack();
      break;

  }
  drawBoss()
}

// let bossTimeOut = 0;
function bossAttack() {
  // interval= setTimeout(bossAttack, 3000);
  // let rNum = Math.floor(Math.random() * currentParty.length);
  // currentParty[rNum].health -= boss.damage
// clearTimeout(bossTimeOut)
// if (interval != null) {
//   clearInterval(interval);
// }

  // bossAttackInterval = setInterval(bossAttack, 3000);

  // setInterval(bossAttack, 2000)
 
  drawParty();
  // bossAttack()
}
// #endregion END-ATTACKS

// #region DRAWING TO APGE
function drawParty() {

  let template = '';
  currentParty.forEach((hero) => {
    template += `
  <div class="card mx-3 " style="width: 10rem">
  <img
    id="boss"
    src=" ${hero.picture}"
    alt="boss"
    class="p-2"
  />
  <div class="card-body">
    <div>
      <h5 class="card-title text-center">${hero.name}</h5>
    </div>
    <div  class="text-center">
      <div>
        Health:
        <span id="hero-health " class="fs-4 text-danger"><i class="mdi mdi-heart heart"></i>${hero.health}</span>
      </div>
      <div class="text-center">
        Gold: $<span id="hero-gold" class="fs-4 text-warning"
          >${hero.gold}</span
        >
      </div>
      <div class="text-center">
        Lvl: <span id="hero-level" class="fs-4 text-success">${hero.level}</span>
      </div>
      <div><button onclick="attack('${hero.type}')" class="btn btn-danger ">Attack</button></div>
      <div class="text-center">
        Damage: <span id="hero-level" class="fs-4 text-info ">${hero.damage}</span>
      </div>
    </div>
  </div>
</div>
  `;
  });



  heroTable.innerHTML = template;
}


function recruitMage(){

currentParty.push(mage)
drawParty()
}
function recruitThief(){

currentParty.push(thief)
drawParty()
}


function drawBoss() {
  bossHP.innerText = boss.health;
  bossLVL.innerText = boss.level;
}
// #end region

function heroesLevelUp() {}

function bossLevelUp() {
  if (boss.health <= 0) {
    alert('you killed the boss, but this is not the end...');
    boss.level++;
    boss.maxHealth += 100;
    boss.damage += 10; //random eventually
    boss.health += boss.maxHealth;
    currentParty.forEach((hero) => {
      hero.gold += 10; //random eventually//
      // console.log(hero.gold);
    });
  }
  drawBoss();
  drawParty();
}
drawBoss();
drawParty();
bossAttack();
