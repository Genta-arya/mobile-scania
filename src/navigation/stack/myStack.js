import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import _layoutHome from '../../Layouts/Home/_layoutHome';
import _layoutCompany from '../../Layouts/Company/_layoutCompany';
import _layaoutAbout from '../../Layouts/Abaout/_LayoutAbout';
import _layoutFaultCodes from '../../Layouts/FaultCodes/_layoutFaultCodes';
import PdfPreview from '../../Layouts/PDF/PdfPreview';
import _LayaoutWorkshop from '../../Layouts/WorkShop/_LayaouWorkshop';

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
        options={{ 
          headerShown: false, 
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } } 
        }}
      />
      <Stack.Screen
        name="Company"
        component={_layoutCompany}
        options={{
          title: 'Company Profile',
          headerTitleStyle: { fontSize: 16 }, // Ukuran font judul
          animationTypeForReplace: 'push',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
        }}
      />
      <Stack.Screen
        name="About"
        component={_layaoutAbout}
        options={{
     
          headerTitle : '',
          headerTitleStyle: { fontSize: 16 }, 
          animationTypeForReplace: 'pop',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
        
        }}
      />
      <Stack.Screen
        name="FaultCodes"
        component={_layoutFaultCodes}
        options={{
          title: 'Fault Codes',
          headerTitleStyle: { fontSize: 16 },
          
          animationTypeForReplace: 'push',
          presentation: 'modal',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
        }}
      />
      <Stack.Screen
        name="WorkShop"
        component={_LayaoutWorkshop}
        options={{
          title: 'Workshop Folder',
          headerTitleStyle: { fontSize: 16 }, 
          animationTypeForReplace: 'push',
          presentation: 'modal',
          animationEnabled: true,
          transitionSpec: { open: { animation: 'timing' }, close: { animation: 'timing' } },
        }}
      />
      <Stack.Screen
        name="PdfPreview"
        component={PdfPreview}
        options={{
          title: 'Preview File',
          headerTitleStyle: { fontSize: 16 }, // Ukuran font judul
          animationTypeForReplace: 'push',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default MyStack;
