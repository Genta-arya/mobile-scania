import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import _layoutHome from '../../Layouts/Home/_layoutHome';
import _layoutCompany from '../../Layouts/Company/_layoutCompany';
import _layaoutAbout from '../../Layouts/Abaout/_LayoutAbout';
import _layoutFaultCodes from '../../Layouts/FaultCodes/_layoutFaultCodes';
import PdfPreview from '../../Layouts/PDF/PdfPreview';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true, 
        animationEnabled: true, 
       
      }}
    >
      <Stack.Screen
        name="Home"
        component={_layoutHome}
        options={{ headerShown: false , transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } } }}
      />
      <Stack.Screen
        name="Company"
        component={_layoutCompany}
        options={{
          title: 'Company Profile',
          animationTypeForReplace: 'push',
          animationEnabled: true,
        transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
   
        }}
      />
      <Stack.Screen
        name="About"
        component={_layaoutAbout}
        options={{
          title: 'About',
          animationTypeForReplace: 'pop',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
     
       animation:'slide_from_right',
       
         
        }}
      />
      <Stack.Screen
        name="FaultCodes"
        component={_layoutFaultCodes}
        options={{
          title: 'Search Fault Codes',
          animationTypeForReplace: 'push',
          presentation: 'card',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
        }}
      />
      <Stack.Screen
        name="PdfPreview"
        component={PdfPreview}
        options={{
          title: 'Preview File',
          animationTypeForReplace: 'push',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
