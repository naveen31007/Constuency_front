// import React, { Component, createContext } from 'react';
// import jwt_Decode from 'jwt-decode';
// import api from './Admin/Api/BaseUrl';
// import LoginApi from './Admin/Api/LoginApi';

// const Provider = createContext();

// class Context extends Component {
//   constructor() {
//     super();
//     this.state = {
//       user: null,
//       loading: true,
//     };
//   }

//   componentDidMount() {
//     this.defaultFunction();
//   }

//   defaultFunction = async () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       api.setHeader('Authorization', `Bearer ${token}`);
//       await this.decodeToken(token);
//     }
//     this.setState({ loading: false });
//   };

//   decodeToken = async (token) => {
//     try {
//       const decoded = jwt_Decode(token);
//       // console.log(decoded);
//       if (decoded.exp) {
//         this.setState({ user: decoded.exp });
//       }
//       this.setState({ loading: false });
//     } catch (error) {
//       console.log(error);
//       localStorage.clear();
//       this.props.navigate('/login');
//     }
//   };

//   loginhandle = async (data) => {
//     try {
  
//       const response = await LoginApi.login(data);
//       if (response.ok) {
//         const token = response.data.token;
//         localStorage.setItem('token', token);
//         await this.decodeToken(token);
//         this.props.navigate('/dashboard');
//       }
       
//     } catch (error) {
//       console.log(error);
//     }
//     this.setState({ loading: false });
//   };

//   logout = () => {
//     localStorage.removeItem('token');
//     this.setState({ user: null });
//     this.props.navigate('/login');
//   };

//   render() {
//     return (
//       <Provider.Provider
//         value={{
//           ...this.state,
//           loginhandle: this.loginhandle,
//           logout: this.logout,
//         }}
//       >
//         {this.props.children}
//       </Provider.Provider>
//     );
//   }
// }

// export { Context, Provider };
import React, { Component, createContext } from 'react';
import jwt_Decode from 'jwt-decode';
import api from './Admin/Api/BaseUrl';
import LoginApi from './Admin/Api/LoginApi';

const Provider = createContext();

class Context extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.defaultFunction();
  }

  defaultFunction = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      api.setHeader('Authorization', `Bearer ${token}`);
      await this.decodeToken(token);
    }
    this.setState({ loading: false });
  };

  decodeToken = async (token) => {
    try {
      const decoded = jwt_Decode(token);
      if (decoded.exp) {
        this.setState({ user: decoded.exp });
      }
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
      localStorage.clear();
      this.props.navigate('/login');
    }
  };

  loginhandle = async (data) => {
    try {
      const response = await LoginApi.login(data);
      if (response.ok) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        await this.decodeToken(token);
        this.props.navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ loading: false });
  };

  logout = async (callback) => {
    this.setState({ loading: true });

    try {
      // Perform any asynchronous cleanup or additional actions
      await api.logout(); // Example: Making an API request to log out on the server
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem('token');
    this.setState({ user: null, loading: false }, () => {
      if (callback && typeof callback === 'function') {
        callback();
      }
      this.props.navigate('/login');
    });
  };

  render() {
    return (
      <Provider.Provider
        value={{
          ...this.state,
          loginhandle: this.loginhandle,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </Provider.Provider>
    );
  }
}

export { Context, Provider };
