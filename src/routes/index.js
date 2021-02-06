import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home/dashboard'
import PoiList from '../pages/POI/poi_list'
import PoiNew from '../pages/POI/poi_formview'
import Customer_List from '../pages/Management/Customer_M/customer_listview'
import Customer_Form from '../pages/Management/Customer_M/customer_formview'
import ComponentToPrint from '../pages/Test_framwork/test_framwork'
import Accomodation_List from '../pages/Management/Accommodation/ac_listview'
import Accomodation_Formview from '../pages/Management/Accommodation/ac_formview'
import Transport_Listview from '../pages/Management/Transportation/transport_listview'
import Transport_Formview from '../pages/Management/Transportation/transport_formview'
import Transport_Formupdate from '../pages/Management/Transportation/transport_formupdate'
import Itinerary_List from '../pages/Itinenary/itinerary_listview'
import Itinerary_Formview from '../pages//Itinenary/itinerary_formview'
import Test_User_Manage from '../pages/Setting/user_management'
import User_Manage from '../pages/Setting/UserManagement/userManagement'
import User_Profile from '../pages/Setting/Userprofile/user_profile'
import User_Profile_Formview from '../pages/Setting/Userprofile/user_profile_fromview'
import Accomodation_Formupdate from '../pages/Management/Accommodation/ac_formupdate'
import Customer_Formupdate from '../pages/Management/Customer_M/customer_formupdate'
import test_modal from '../pages/Test_framwork/test_passmodal'
import PoiUpdate from '../pages/POI/poi_formupdate'
import poupdate from '../pages/POI/poupdate'
import User_Profile_Formupdate from '../pages/Setting/Userprofile/user_profile_formupdate'
import Test_Management from '../pages/Setting/TestManagement'
import testM from '../pages/Setting/testM'
import Itinerary_Formupdate from '../pages/Itinenary/itinerary_formupdate'



export default () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/poi_list" component={PoiList} />
        <Route exact path="/poi_formview" component={PoiNew} />
        <Route exact path="/poi_formupdate/:id" component={PoiUpdate} />
        <Route exact path="/customer_list" component={Customer_List} />
        <Route exact path="/customer_form" component={Customer_Form} />
        <Route exact path="/customer_formupdate/:id" component={Customer_Formupdate} />
        <Route exact path="/accom_list" component={Accomodation_List} />
        <Route exact path="/accom_form" component={Accomodation_Formview} />
        <Route path="/accom_formupdate/:id" component={Accomodation_Formupdate} />
        <Route exact path="/transport_list" component={Transport_Listview} />
        <Route exact path="/transport_form" component={Transport_Formview} />
        <Route exact path="/transport_formupdate/:id" component={Transport_Formupdate} />
        <Route exact path="/itinerary_list" component={Itinerary_List} />
        <Route exact path="/itinerary_form" component={Itinerary_Formview} />
        <Route exact path="/itinerary_formupdate/:id" component={Itinerary_Formupdate} />
        <Route exact path="/test_user_manage" component={Test_User_Manage} />
        <Route exact path="/user_manage" component={User_Manage} />
        <Route exact path="/user_profile" component={User_Profile} />
        <Route exact path="/user_profile_fromview" component={User_Profile_Formview} />
        <Route exact path="/user_profile_formupdate/:id" component={User_Profile_Formupdate} />
        <Route exact path="/test" component={poupdate} />
        <Route exact path="/testmanagement" component={Test_Management} />
        <Route exact path="/testm" component={testM} />
        {/* <Route exact path="/test_framwork" component={ComponentToPrint} /> */}
        <Route exact path="/test_framwork" component={test_modal} />
    </Switch>
)