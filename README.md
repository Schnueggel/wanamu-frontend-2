# Goal
At the moment I try to marry React and Rx in this Project to avoid Flux.

In the end a want to have an easy to understand setup where the code follows a simple strategy.

`[2015-12-01]`

I copied some code here from other apps. Like the data models. This code will change most likly. Especially because of ImmutableJs that I will integrate later.


# Material-Design-Lite
I also try Material-Design-Lite (mdl) css framework with this App. So far it looks good. But mdl updates the dom after windows.load and dont react
to any changes made after this. To make mld aware of a new mdl element we have to use the javascript object componentHandler that comes with mdl.
So far I used a timeout to trigger componentHandler.upgradeDom() after react finished rendering. This is working most of the time but not always.
I will have to find a way to handle this Problem without any hacks or I have to remove mdl.

# Good bye mdl `[2015-12-08]`

So after some experiments I decided to remove mdl. Its simply not ment to be used with react. Which is also offically statet. It can be made working but it comes with the price of doing some non react style staff like:

```
componentDidUpdate() {
 this.refs.textbox.MaterialTextField.dirtyCheck();
 this.refs.textbox.MaterialTextField.validityCheck();
}
```

The after componentDidUpdate DOM manipulation of mdl is not leading to something good at least this is my feeling. So I will start to remove it at least the javascript part of mdl. Instead I'll keep the css and do the DOM manipulation with react.

I would like to use RxJS also for components like the RegisterForm thats of course possible but then passing this request to registerAction and connect it with the userservice will not work.
At least not as I planned I had in mind something like creating circual streams without to much subscribtions and subjects inbetween.
The Actions and StateModels are singletons and create their streams during construction time. Connected Streams of components that get unmounted will be left. Perhaps something like multicast operator can solve this. Lets see.

Also interesting sounds [https://github.com/cyclejs]. I think its doing what Iam trying to do somehow. If I have time I will take a look.

# Go Immutable `[2015-12-05]`

I added immutablejs and changed todolist and todo data models to Immutable.Records.

### Problems
1.  I wasn't able to create a typescript definition to describe a class that inherits from Immutable.Records return type in a way that it works without warnings.
technically it worked without any problems but typescript didnt like it. Also see this issue [https://github.com/facebook/immutable-js/issues/341]. So for now I have a simpler approach with out data model classes. I will try later again.

2. With immutable objects I run into the problem that when a todo changes for example the color. I create a new todo object and send it for an update to the server. Until the new todo comes back from the server
the color of the todo will be the old one even if I attach the new todo object to the todo component. This is because any state change also triggers a componentUpdate which will also deliver the old todo object (which is attached to the props) with the old color.
I can work arround this by checking if the new todo object is the old one but this feels a bit hacky. So I will change the strategy on the data flow. Still not sure what will be best here but I am working on it.


# Start
 `[2015-12-01]`

* I created StateModels that are holding the application state. StateModels offer a change streams. You can subscribe to this streams to get notified when the State changes.
* The AppStateModel is the top state which contains all other states. The AppState subscribes to all his SubStates change streams and forward this changes to its own change stream.
* I created Actions that can trigger certain actions like doLoadTodoList or doUpdateTodo. This actions also offer streams you can subscribe to.
* I created Controller Components. They build the upper layer of the ReactDom. It is the deepest point in the application where AppState and Actions are visible.
* StateModels are aware of Actions and can subscribe to the streams they offer.
* Any AppState change will trigger a ComponentUpdate on the Root Component
* So far this works but data models and states are mutable. Which mean extra work to update models.



