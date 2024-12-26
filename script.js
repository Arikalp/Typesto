window.onload = function() {
    newGame();
};
var words = "apple,arrow,airport,alien,army,anchor,animal,alley,anger,answer,angle,album,artist,around,arise,awake,aroma,adapt,aware,abuse,attic,abroad,abruptball,bag,bank,bat,battery,battle,bathroom,believe,bench,bend,below,belong,beneath,basic,better,beyond,black,blade,blame,bless,block,blood,board,bonus,borrowcat,can,carry,camera,castle,careful,carpet,carbon,career,cartoon,cause,cave,cell,center,charge,chart,choice,choose,classic,climate,clock,close,cloud,coach,dog,dark,daily,damage,danger,daughter,debate,decade,deep,defeat,defend,define,degree,delay,deliver,depth,desert,desire,detail,device,devote,dialogue,differ,direct,distance,eagle,early,earn,earth,easy,economy,editor,effort,elder,elect,element,elite,embark,embrace,emerge,emotion,empire,employ,empty,enable,encourage,energy,enforce,engage,enjoy,enrich,ensure,father,fabric,face,fair,famous,fancy,farmer,fashion,favorite,feather,federal,fee,feeling,fence,festival,fiction,field,figure,final,finance,finger,finish,flame,flight,float,flower,focus,giant,garage,garden,gas,gate,gender,general,gentle,genuine,gesture,ghost,giant,gift,glass,global,glove,glow,goal,goat,govern,grace,grade,grain,grant,graph,grasp,gravity,grief,group,happy,habit,hair,half,hammer,hand,handle,hang,happen,harbor,hard,harvest,hat,head,health,hear,heart,heat,heaven,heavy,hedge,height,helicopter,hello,helmet,help,herb,heritage,ice,icon,idea,ideal,identify,ignore,ill,illegal,image,impact,impress,improve,include,income,index,indoor,infant,influence,inform,inhale,injury,ink,inquiry,insect,inside,inspire,install,jacket,jail,jar,jaw,jazz,jealous,jeans,jelly,jewel,job,join,joint,joke,journey,joy,judge,juice,jump,jungle,junior,junk,justice,justify,just,keen,keep,kernel,key,keyboard,kind,king,kiss,kitchen,kite,ladder,lake,lamp,landscape,language,large,last,late,laugh,launch,lawn,leader,leaf,league,leap,learn,leave,lecture,legal,lemon,length,lesson,letter,level,liberty,library,license,life,light,magic,magnet,mail,major,make,manage,mango,manual,map,marble,march,market,marry,mask,master,match,material,math,maximum,mayor,meal,meaning,measure,media,medical,member,memory,mentor,mercy,nail,name,narrow,nation,native,navy,near,nearly,neat,necessary,neck,need,needle,negative,neglect,nephew,nerve,network,neutral,never,news,next,nice,night,noise,normal,notebook,nothing,notice,oak,oath,object,observe,obtain,obvious,occupy,occur,ocean,offer,office,official,oil,okay,old,olive,omit,once,ongoing,online,only,open,operate,opinion,oppose,option,orbit,order,organ,orient,origin,pact,page,pair,palm,panel,paper,parcel,park,part,partner,party,pass,passion,past,patch,path,patient,pattern,pause,peace,pearl,penalty,people,pepper,perfect,perform,period,permit,persuade,phase,queen,query,quest,question,quick,quiet,quit,quote,race,radar,radio,rail,raise,random,range,rapid,rare,rate,reach,react,read,ready,real,reason,rebel,recall,receive,recipe,record,recover,reduce,safety,sail,salad,salary,sale,salt,sample,sand,satellite,save,scale,scatter,scene,scheme,school,science,scope,score,script,search,season,seat,second,secure,see,seem,segment,select,self,seller,table,tablet,tag,talent,tank,tap,target,task,taste,teach,team,tear,technical,teen,telephone,television,tell,temperature,temporary,tennis,tension,term,terrain,test,text,thank,theme,then,theory,thing,umbrella,unable,uncle,under,undergo,understand,uniform,union,unique,unit,universe,unknown,unlike,unlock,until,unusual,update,upgrade,uphold,uplift,upon,upper,upset,urban,urge,urgent,usage,useful,vacant,vacation,valid,value,van,vanish,vapor,variable,variation,variety,vast,vehicle,velvet,vendor,venture,verbal,verify,version,vertical,very,vessel,via,victory,video,view,village,violate,virtue,vision,waist,wait,wake,walk,wall,want,war,warm,warn,wash,waste,watch,water,way,weaken,wealth,weapon,wear,weather,web,weekend,weigh,weight,welcome,west,western,what,when,where,whether,which,white,ray,xenon,xerox,xylophone,yellow,yet,you,young,your,youth,zebra,zero,zone,zoo,zoom ".split(",");

var word_length = words.length;
var currentWordIndex = 0;
var currentCharIndex = 0;
var startTime;

// Event Listener setup
function setupEventListener() {
    document.removeEventListener('keydown', handleKeyPress); // Remove any previous listener
    document.addEventListener('keydown', handleKeyPress);
}

function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function newGame() {
    startTime=0;
    document.getElementById('words').innerHTML = '';
    for (var i = 0; i < 50; i++) {
        var span = document.createElement('span');
        span.textContent = randomWord() + ' '; // Using textContent instead of innerHTML
        document.getElementById('words').appendChild(span);
    }
    currentWordIndex = 0;
    currentCharIndex = 0;
    startTime = new Date();
    document.addEventListener('keypress', handleKeyPress);
}

function handleKeyPress(event) {
    var wordsContainer = document.getElementById('words');
    var spans = wordsContainer.getElementsByTagName('span');
    var currentWord = spans[currentWordIndex]?.innerText.trim();
    var typedChar = event.key;

    // Handle space to move to next word
    if (typedChar === ' ') {
        if (currentCharIndex === currentWord.length) {
            spans[currentWordIndex].innerHTML = currentWord; // Reset current word's HTML
            spans[currentWordIndex].classList.add('completed');
            currentWordIndex++;
            currentCharIndex = 0;
            
            if (currentWordIndex >= spans.length) {
                document.removeEventListener('keypress', handleKeyPress);
                calculateTypingSpeed();
                return;
            }
        }
        return;
    }

    // Handle character typing
    if (typedChar === currentWord[currentCharIndex]) {
        let highlighted = currentWord.substring(0, currentCharIndex + 1);
        let rest = currentWord.substring(currentCharIndex + 1);
        
        spans[currentWordIndex].innerHTML = 
            `<span class="highlighted">${highlighted}</span>${rest}`; 
        
        currentCharIndex++;

        if (currentCharIndex === currentWord.length) {
            spans[currentWordIndex].classList.add('ready');
        }
    }
}



function calculateTypingSpeed() {
    var endTime = new Date();
    var timeDiff = (endTime - startTime) / 1000; // in seconds
    var wordsTyped = currentWordIndex;
    var typingSpeed = (wordsTyped / timeDiff) * 60; // words per minute
    typingSpeed = Math.round(typingSpeed)+20;
    //alert('Typing speed: ' + typingSpeed.toFixed(2) + ' words per minute');
    document.getElementById('speed').innerHTML = 'Typing Speed: '+typingSpeed.toFixed(0)+ ' WPM';
}

