
import moment from 'moment';

export const defaultState = {
    // main page
    name: "",
    autocomple_customer: [],
    select_customer: "",
    airline: "",
    airline_return: "",
    arrival_date: "",
    return_date: "",
    exchange: "",
    salesperson: "",
    remark: "",
    document_id: "",
    radio_currency: 'THB',
    currency_price: 0,
    adult: 0,
    child: 0,
    infant: 0,
    count_dataSource_1: 0,
    count_day: 1,
    count_key: 0,
    visible: false,
    type_modal: "modal_POI",
    item_customer: [],
    dataSource: [],
    dataActivity: [],
    getDataActivity: [],
    main_total_price: 0,
    addition_cost: 0,
    total_cost: 0,
    markup_margin: 0,
    subtotal: 0,
    review_summary: 0,
    avg_price: 0,
    status: "NEW",
    item_itinerary: [],
    dataOnDay: [],
    temp_data: [],
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // State MODAL POI
    poi_check_option: ["ATTRACTION", "RESTAURANT", "SHOPPING", "BEAUTY & SPA", "ENTERTAINMENT", "EXPERIENCE"],
    poi_place: [],
    item_poi: [],

    modal_poi: {
        name: "",
        day: "",
        time: "00:00",
        date_activities: "",
        select_place: "",
        adult_price: 0,
        child_price: 0,
        infant_price: 0,
        total_price: 0,
        dropdown_adult: 1,
        dropdown_child: 1,
        dropdown_infant: 1,
        note: ""
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // State MODAL Accom
    item_accom: [],
    ac_room_type: [],
    ac_property_name: [],
    ac_today_price: 0,
    ac_total_price: 0,
    ac_extra_price: 0,
    ac_check_option: ["HOTEL", "APARTMENTS", "GUESTHOUSES", "RESORTS", "VILLAS", "CAPSULE HOTELS"],
    modal_accom: {
        name: "",
        select_property_name: "",
        select_roomtype: "",
        ac_room: 1,
        ac_checkin: "",
        date_checkin: "",
        checkin_time: "00:00",
        ac_checkout: "Day 1",
        checkout_time: "00:00",
        ac_today_price: 0,
        ac_total_price: 0,
        ac_extra_price: 0,
        note: ""
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // State MODAL Transport
    item_transport: [],
    tran_carmodel: [],
    modal_transport: {
        name: "",
        date: "",
        day: "",
        p_location: "Suvarnabhumi Airport",
        d_location: "Suvarnabhumi Airport",
        select_carmodel: "",
        pickup: "",
        pickup_time: "00:00",
        dropoff: "Day 1",
        dropoff_time: "00:00",
        quantity: 1,
        carseat_value: 1,
        quantity_price: 0,
        carseat_price: 0,
        extra_price: 0,
        total_price: 0,
        note: ""
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // STATE MODAL OTHER
    modal_other: {
        time: "00:00",
        date: "",
        day: "",
        price: 0,
        note: ""
    },
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // table oneday
    add_day: [],
    oneday_date: moment(),
    data_addoneday: [],
    dataSourceOneDay: [],
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
};