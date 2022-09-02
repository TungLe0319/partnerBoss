const heroes = [
  {
    name: 'Clay More',
    type: 'Warrior',
    damage: 5,
    health: 100,
    maxHealth: 100,
    level: 1,
    gold: 0,
    picture: 'https://orna.guide/static/orna/img/packs/nothren/2_m.png',
  },
  {
    name: 'Werlin Spinn',
    type: 'Mage',
    damage: 40,
    health: 50,
    maxHealth: 50,
    level: 3,
    gold: 0,
    picture: 'https://orna.guide/static/orna/img/packs/avalon/mage_m.png',
  },
  {
    name: 'Rob Banks',
    type: 'Thief',
    damage: 30,
    health: 75,
    maxHealth: 75,
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
let bossDamage = boss.damage

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

let goldTotal = 0

function getGold() {
  currentParty.forEach(hero => {
    goldTotal += hero.gold
  })
}
// #region ATTACKS
function warriorAttack() {
  boss.health -= warrior.damage;
  bossHP.innerText = boss.health;
}
function mageAttack() {
  boss.health -= mage.damage;
  bossHP.innerText = boss.health;
}
function thiefAttack() {
  boss.health -= thief.damage;
  bossHP.innerText = boss.health;
  thief.gold += thief.steal
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
  bossLevelUp()
}


function bossAttack() {
  let rNum = Math.floor(Math.random() * currentParty.length);
  currentParty[rNum].health -= bossDamage
  drawParty();
}
// #endregion END-ATTACKS

// #region DRAWING TO PAGE
function drawParty() {
  let template = '';
  currentParty.forEach((hero) => {
    template += `
  <div class=" mx-3 " style="width:10rem">
  <img
    id="boss"
    src=" ${hero.picture}"
    alt="boss"
    class="img-fluid pb-2 "
  />
  <div class="card-body bg-light rounded ">
    <div>
      <h5 class="card-title text-center">${hero.name}</h5>
    </div>
    <div  class="text-center">
      <div>
        Health:
        <span id="hero-health" class="fs-4 text-danger">${hero.health}</span>
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


function recruitMage() {

  currentParty.push(mage)
  drawParty()
}
function recruitThief() {

  currentParty.push(thief)
  drawParty()
}


function drawBoss() {
  bossHP.innerText = boss.health;
  bossLVL.innerText = boss.level;
}
// #endregion

function heroesLevelUp() {
  currentParty.forEach(hero => {
    hero.damage += 10
    hero.maxHealth += 20
    hero.level++
    hero.health += hero.maxHealth - hero.health
  })
}

function bossLevelUp() {
  if (boss.health <= 0) {
    alert('you killed the boss, but this is not the end...');
    boss.level++;
    boss.maxHealth += 100;
    boss.damage += 10; //random eventually
    boss.health += boss.maxHealth;
    currentParty.forEach((hero) => {
      hero.gold += 50; //random eventually//
      // console.log(hero.gold);
    });
    heroesLevelUp()
  }
  drawBoss();
  drawParty();
}

function divideGold() {
  getGold()
  let splitGold = Math.floor(goldTotal / currentParty.length)
  currentParty.forEach(hero => {
    hero.gold = splitGold
  })
}

function buyMage() {
  divideGold()
  if (goldTotal >= 100) {
    goldTotal -= 100
    recruitMage()
    divideGold()
  } else {
    alert('Not enough gold.')
  }
}

function buyThief() {
  divideGold()
  if (goldTotal >= 500) {
    goldTotal -= 500
    recruitThief()
    divideGold()
  } else {
    alert('Not enough gold.')
  }
}

function buyPotion() {
  divideGold()
  if (goldTotal >= 20) {
    goldTotal -= 20
    healParty()
    divideGold()
  } else {
    alert('Not enough gold.')
  }
}

function healParty() {
  warrior.health += warrior.maxHealth / 5
  thief.health += thief.maxHealth / 5
  mage.health += mage.maxHealth / 5
  drawParty()
}

setInterval(bossAttack, 5000)
drawBoss();
drawParty();