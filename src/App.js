import React, { Component,Suspense } from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import User from './containers/User';
import Welcome from './containers/Welcome';
// import Posts from './containers/Posts';
const Posts = React.lazy(()=>{//lazyメソッド(16.6から使える)返り値はComponent
  return import('./containers/Posts');
});

class App extends Component {
  state = {
    showPosts:false
  }
  modeHandler = ()=>{
    this.setState((prevState =>{
      return {showPosts:!prevState.showPosts};
    }));
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button>
        {this.state.showPosts ? (
          // SuspenseコンポーネントでlazyComponentをラップ
          <Suspense fallback={<div>Loading...</div>}>
            <Posts/>
          </Suspense>
          ):(
            <User />
          )
        }
      </React.Fragment>
      // <BrowserRouter>
      //   <React.Fragment>
      //     <nav>
      //       <NavLink to="/user">User Page</NavLink> |&nbsp;
      //       <NavLink to="/posts">Posts Page</NavLink>
      //     </nav>
      //     <Route path="/" component={Welcome} exact />
      //     <Route path="/user" component={User} />
      //     <Route path="/posts" 
      //       render={()=>(
      //         // lazyComponentをSuspenseでラップする
      //         <Suspense fallback={<div>Loading...</div>}>
      //           <Posts />
      //         </Suspense>
      //         )} />
      //   </React.Fragment>
      // </BrowserRouter>
    );
  }
}

export default App;
