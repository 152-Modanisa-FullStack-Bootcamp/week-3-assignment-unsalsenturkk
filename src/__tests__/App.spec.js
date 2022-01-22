import {createLocalVue, shallowMount} from "@vue/test-utils";
import App from "@/App";
import Vuex from "vuex";
import {state,getters,mutations,actions} from "@/store";
import app from "@/App";

describe("App.vue", () => {
    let wrapper
    let localVue
    let store
    beforeEach(() => {
        localVue = createLocalVue()
        localVue.use(Vuex)

        store = new Vuex.Store({
            state,
            getters,
            mutations,
            actions
        })

        wrapper = shallowMount(App, {
            localVue,
            store
        })
    })
    it("h1 exists check", () => {
        const h1 = wrapper.find("h1")

        expect(h1.exists()).toBeTruthy()
    })
    it("h1 text equals to 'Daily Corona Cases in Turkey'", () => {
        const h1 = wrapper.find("h1")
        expect(h1.exists()).toBeTruthy()
        expect(h1.text()).toStrictEqual("Daily Corona Cases in Turkey")
    })

    it('notificationArea class check based on getCount value ', () => {
        let notificationArea
        notificationArea  = wrapper.find(".notificationArea")
        expect(notificationArea.classes()).toContain("safe")

        state.count = 6
        wrapper = shallowMount(App, {
            localVue,
            store
        })

        notificationArea = wrapper.find(".notificationArea")
        expect(notificationArea.classes()).toContain("normal")


        state.count = 11
        wrapper = shallowMount(App, {
            localVue,
            store
        })

        notificationArea = wrapper.find(".notificationArea")
        expect(notificationArea.classes()).toContain("danger")

    });
    it('notificationArea text message check', () => {
        let count = 0
        let localThis = {
            $store : {
                state : {
                    count
                }
            }
        }
        let message =  App.computed.message.call(localThis)
        expect(message).toContain(`So safe. Case count is ${count}k`)

        count = 6
        localThis = {
            $store : {
                state : {
                    count
                }
            }
        }
        message =  App.computed.message.call(localThis)
        expect(message).toContain(`Life is normal. Case count is ${count}k`)

        count = 11
        localThis = {
            $store : {
                state : {
                    count
                }
            }
        }
        message =  App.computed.message.call(localThis)
        expect(message).toContain(`Danger!!! Case count is ${count}k`)

    });
})