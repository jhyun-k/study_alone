// 재현님 코드에서 다운로드 기능을 없앤... 할 수 있으면 수정 기능도 넣기..!
// 구현 예정 기능 : 할일쓰면 투두 생김, 로컬스토리지에 저장

const main = document.querySelector('.main');
const task = main.querySelector('header input');
const addBtn = main.querySelector('header button');
const listTodo = main.querySelector('.list_todo');


//투두를 저장할 배열
const taskArray = JSON.parse(localStorage.getItem('tasklist'))||[] 

// 초기화면에서 저장되어 있는 데이터 가지고 목록을 생성합니다
if(taskArray.length>0){
    taskArray.forEach((task)=>{
        genItem(task.val,task.checked)
    })
}


addBtn.addEventListener('click',createListItem);

function createListItem() {
    const inpVal = task.value;
    if(inpVal){
        //할 일 저장하는 객체 생성
        const tempTask = {
            val : inpVal,
            checked : false,
        };
        //할 일 목록에 새로운 할 일 저장하기
        taskArray.push(tempTask)

        // 목록 요소 생성 (generate item)
        genItem(inpVal,false)

        // 할 일 데이터를 localStroage 에 저장
        saveTasks()
        
    }else{
        errorMsg('내용을 작성해야함!!')
    }
}

//CREATE
function genItem(val,complete){
    const li = document.createElement('li');
    li.textContent = val;
    listTodo.appendChild(li);
    

    //인풋창 초기화 하기
    task.value = '';

    //만약 done 상태라면?
    if(complete){
        li.classList.add('done')
    }

    li.addEventListener('click',()=>{
        li.classList.toggle('done');
        //할 일 업데이트 함수
        buildTask()
        console.log(val)
    })

    // 삭제버튼 만들기
    const delBtn = document.createElement('button');
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
    li.appendChild(delBtn)

    //DELETE
    delBtn.addEventListener('click',()=>{
        li.remove();
        //할 일 업데이트 함수
        buildTask()
    })
}

//로컬스토리지에 할 일 목록 저장하는 함수
function saveTasks(){
    localStorage.setItem('tasklist',JSON.stringify(taskArray))
}

//할 일 정보를 업데이트 하는 함수, 할 일 클릭했을 때 
function buildTask(){
    taskArray.length = 0; // 업데이트 하기 전에 기존 데이터를 초기화 합니다
    const curList = document.querySelectorAll('li');

    curList.forEach((el)=>{
        const tempTask = {
            val : el.textContent,
            checked : false
        }
        if(el.classList.contains('done')){
            tempTask.checked = 'true';
        }
        taskArray.push(tempTask);
    })
    saveTasks()
}
