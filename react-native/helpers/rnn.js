import React, { useState, useEffect } from 'react';
import { Navigation } from 'react-native-navigation';


let _screenIds;

function initNavigation(ScreenIds) {
  _screenIds = ScreenIds;
}

class DrawerHelper {
  constructor() {
    this.visibility = {
      left: false,
      right: false,
    };

    Navigation.events().registerComponentDidAppearListener(({ componentId }) => {
      if (componentId === _screenIds.Drawer) {
        this.visibility.left = true;
      }

      // if (componentId === RIGHT_SIDE_MENU_ID) {
      //   this.visibility.right = true;
      // }
    });

    Navigation.events().registerComponentDidDisappearListener(({ componentId }) => {
      if (componentId === _screenIds.Drawer) {
        this.visibility.left = false;
      }

      // if (componentId === RIGHT_SIDE_MENU_ID) {
      //   this.visibility.right = false;
      // }
    });
  }

  /*getId(side) {
    if (side === 'left') return LEFT_SIDE_MENU_ID;
    return RIGHT_SIDE_MENU_ID;
  }*/

  // side: String ('left', 'right')
  open(side) {
    try {
      const id = _screenIds.Drawer; //this.getId(side);
      Navigation.mergeOptions(id, {
        sideMenu: {
          [side]: {
            visible: true,
          },
        },
      });
      this.visibility[side] = true;
    } catch (error) {}
  }

  // side: String ('left', 'right')
  close(side) {
    try {
      const id = _screenIds.Drawer; //this.getId(side);
      Navigation.mergeOptions(id, {
        sideMenu: {
          [side]: {
            visible: false,
          },
        },
      });
      this.visibility[side] = false;
    } catch (error) {}
  }

  // side: String ('left', 'right')
  toggle(side) {
    try {
      const id = _screenIds.Drawer; //this.getId(side);
      const visibility = !this.visibility[side];
      Navigation.mergeOptions(id, {
        sideMenu: {
          [side]: {
            visible: !this.visibility[side],
          },
        },
      });
      this.visibility[side] = visibility;
    } catch (error) {}
  }
}

function push(componentId, routeKey, params, navOptions) {
  // if(_currentComponentName == _screenIds[routeKey].route) {
  //   return;
  // }

  const route = routeKey in _screenIds ? _screenIds[routeKey] : routeKey;

  let navObject = {
    component: {
      //id: _screenIds[routeKey].route,
      name: route,
      passProps: params,
      options: /*Object.assign(_screenIds[routeKey].navigationOptions, {
        topBar: {
          title: {
            text: routeKey in Strings.titles ? Strings.titles[routeKey] : ''
          }
        }
      }, navOptions)*/
      Object.assign({
        /*statusBar: {
          visible: true,
          style: "dark",
          backgroundColor: "green"
        },*/
        topBar: {
          visible: false,
          animate: false,
          drawBehind: true
        }
      }, navOptions)
    }
  };

  return Navigation.push(componentId, navObject);
}

function popToRoot(componentId) {
  return Navigation.popToRoot(componentId);
}

function pop(componentId) {
  return Navigation.pop(componentId);
}

function popTo(componentId) {
  return Navigation.popTo(componentId);
}

function showModal(routeKey, params, navOptions) {
  const route = routeKey in _screenIds ? _screenIds[routeKey] : routeKey;
  let navObject = {
    // Adds topbar space when using stack !!!!
    // https://github.com/wix/react-native-navigation/issues/4053#issuecomment-434105220
    //stack: {
    //  children: [
    //    {
      component: {
        // id: route,
        name: route,
        passProps: {
          ...params,
          isModal: true
        },
        options: {
          topBar: {
            visible: false,
            animate: false,
          },
          topTabs:{
            visible: false,
            animate: false,
          },
          modalPresentationStyle: "overCurrentContext",
          ...navOptions
          //animations: {
            // animations: {
            //   showModal: {
            //     enable: true
            //   },
            //   dismissModal: {
            //     enable: true
            //   }
            // },
         // },
        },
      }
    //}]}
  };

  return Navigation.showModal(navObject);
}

function dismissModal(componentId, navOptions) {
  return Navigation.dismissModal(componentId, navOptions);
}

function showOverlay(routeKey, params, navOptions) {
  const route = routeKey in _screenIds ? _screenIds[routeKey] : routeKey;
  let navObject = {
    component: {
      //id: route,
      name: route,
      passProps: {
        ...params
      },
      options: Object.assign({
        topBar: {
          visible: false,
          animate: false
        }
      }, navOptions)
    }
  };

  return Navigation.showOverlay(navObject);
}

function dismissOverlay(componentId) {
  return Navigation.dismissOverlay(componentId);
}

function useRNNCommandComplete(callback) {
  useEffect(() => {
    const screenEventListener = Navigation.events().registerCommandCompletedListener(callback);
    return () => screenEventListener.remove();
  }, []);
}

function useRNNAnimComplete() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const screenEventListener = Navigation.events().registerCommandCompletedListener(() => {
      if(!complete) {
        setComplete(true);
        screenEventListener.remove();
      }
    });
    return () => screenEventListener.remove();
  }, []);

  return complete;
}

const Drawer = new DrawerHelper();

export default {
  push,
  showModal,
  dismissModal,
  showOverlay,
  dismissOverlay
}

export {
  initNavigation,
  Drawer,
  push,
  popToRoot,
  pop,
  popTo,
  showModal,
  dismissModal,
  showOverlay,
  dismissOverlay,
  useRNNCommandComplete,
  useRNNAnimComplete
}
