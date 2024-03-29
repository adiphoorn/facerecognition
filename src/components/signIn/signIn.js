import React from 'react';


class Signin extends React.Component {
    constructor(props){
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }

    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPassWordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = ()=> {
      fetch('https://enigmatic-shore-74813.herokuapp.com/signin',{
          method: 'post',
          headers: ({'Content-Type': 'application/json'},
          { 'Access-Control-Allow-Origin' : '*' }),
          body: JSON.stringify({
              email: this.state.signInEmail,
              password: this.state.signInPassword
          })
      })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
      })
    }

    render(){
        const {onRouteChange} =this.props;
    return (
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={ this.onEmailChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email"
                                 name="email-address" 
                                 id="email-address"
                                 required/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onPassWordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password"
                                required />
                        </div>
                        
                    </fieldset>
                        <div className="">
                            <input 
                            onClick={ this.onSubmitSignIn }
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"/>
                        </div>
                        <div className="lh-copy mt3">
                        <p onClick={ () => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                               
                        </div>
                </div>
            </main>
    </article>
 );
    }
}

export default Signin;