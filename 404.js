class Task{

  constructor(text){
    this.text=text
    this.completed=false
    this.time=new Date().toLocaleString()
    this.id=Date.now()
  }

}

class TaskManager{

  constructor(){

    this.tasks=[]
    this.filterMode="all"

    this.load()

    if(this.tasks.length===0){

      let t1=new Task("Do assignment")
      let t2=new Task("Attend lecture")
      let t3=new Task("Work in project")

      t2.completed=true

      this.tasks.push(t1,t2,t3)

      this.save()

    }

    this.render()

  }

  save(){
    localStorage.setItem("tasks",JSON.stringify(this.tasks))
  }

  load(){
    let data=localStorage.getItem("tasks")
    if(data){
      this.tasks=JSON.parse(data)
    }
  }

  addTask(){

    let input=document.getElementById("taskInput")
    let text=input.value.trim()

    if(text==="") return

    let task=new Task(text)

    this.tasks.push(task)

    input.value=""

    this.save()
    this.render()

  }

  toggle(id){

    let task=this.tasks.find(t=>t.id==id)

    task.completed=!task.completed

    this.save()
    this.render()

  }

  delete(id){

    this.tasks=this.tasks.filter(t=>t.id!=id)

    this.save()
    this.render()

  }

  edit(id){

    let task=this.tasks.find(t=>t.id==id)

    let newName=prompt("Edit task:",task.text)

    if(newName){
      task.text=newName
    }

    this.save()
    this.render()

  }

  filter(mode){

    this.filterMode=mode

    this.render()

  }

  sortAlpha(){

    this.tasks.sort((a,b)=>a.text.localeCompare(b.text))

    this.render()

  }

  sortTime(){

    this.tasks.sort((a,b)=>a.id-b.id)

    this.render()

  }

  getFiltered(){

    if(this.filterMode==="complete")
      return this.tasks.filter(t=>t.completed)

    if(this.filterMode==="incomplete")
      return this.tasks.filter(t=>!t.completed)

    return this.tasks

  }

  render(){

    let list=document.getElementById("taskList")

    let data=this.getFiltered()

    list.innerHTML=""

    data.forEach(task=>{

      let li=document.createElement("li")

      if(task.completed)
        li.classList.add("completed")

      li.innerHTML=`

<div>
<div class="taskText" onclick="manager.toggle(${task.id})">${task.text}</div>
<div class="time">${task.time}</div>
</div>

<div class="icons">

<span class="icon" onclick="manager.edit(${task.id})">✏️</span>
<span class="icon" onclick="manager.delete(${task.id})">🗑️</span>

</div>

`

      list.appendChild(li)

    })

  }

}

let manager=new TaskManager()
