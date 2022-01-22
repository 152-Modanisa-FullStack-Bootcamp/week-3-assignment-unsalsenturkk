import {createLocalVue, shallowMount} from "@vue/test-utils";
import Counter from "@/Counter";
import {actions, mutations, state} from "@/store";
import Vuex from "vuex";

describe("Counter.vue", () => {
    describe("exists check", () => {
        let localVue
        let store
        let wrapper
        beforeEach(() => {
            localVue = createLocalVue()
            localVue.use(Vuex)

            store = new Vuex.Store({
                state
            })
            wrapper = shallowMount(Counter, {
                localVue,
                store
            })

        })
        it("Component Exist Check", () => {
            expect(wrapper.exists()).toBeTruthy()
        })
        describe("button exist check", () => {
            it("Increase button exist check", () => {
                const IncreaseBtn = wrapper
                    .findAll("button")
                    .filter(btn => btn.text() === "Increase")
                expect(IncreaseBtn.exists()).toBeTruthy()
            })
            it("Decrease button exist check", () => {
                const DecreaseBtn = wrapper
                    .findAll("button")
                    .filter(btn => btn.text() === "Decrease")
                expect(DecreaseBtn.exists()).toBeTruthy()
            })
        })
    })
    describe("functionality check", () => {
        describe("is it called correctly", () => {
            it('Increase button functionality check', () => {
                const dispatch = jest.fn()
                const localThis = {
                    $store: {
                        dispatch
                    }
                }
                Counter.methods.increase.call(localThis)
                expect(dispatch).toBeCalled()

            });
            it('Decrease button functionality check', () => {
                const dispatch = jest.fn()
                const localThis = {
                    $store: {
                        dispatch
                    }
                }
                Counter.methods.decrease.call(localThis)
                expect(dispatch).toBeCalled()
            });
            it('2 increase + decrease functionality check together', () => {
                const dispatch = jest.fn()
                const localThis = {
                    $store: {
                        dispatch
                    }
                }
                Counter.methods.increase.call(localThis)
                Counter.methods.increase.call(localThis)
                expect(dispatch).toHaveBeenCalledTimes(2)
                Counter.methods.decrease.call(localThis)
                expect(dispatch).toHaveBeenCalledTimes(3)

            });
        })
        describe("test of the functionality itself", () => {
            let localVue
            let store
            let wrapper
            beforeEach(() => {
                localVue = createLocalVue()
                localVue.use(Vuex)
                store = new Vuex.Store({
                    state,
                    mutations,
                    actions
                })
                wrapper = shallowMount(Counter, {
                    localVue,
                    store
                })
            })
            it('test of the functionality Increase button', async () => {
                const IncreaseBtn = wrapper.findAll("button").filter(btn => btn.text() === "Increase")
                expect(state.count).toEqual(0)
                await IncreaseBtn.trigger('click')
                expect(state.count).toEqual(1)
            });
            it('test of the functionality Decrease button', async () => {
                const DecreaseBtn = wrapper.findAll("button").filter(btn => btn.text() === "Decrease")
                expect(state.count).toEqual(1)
                await DecreaseBtn.trigger('click')
                expect(state.count).toEqual(0)
            });
            it('test of the functionality 2 increase + decrease together', async () => {
                const IncreaseBtn = wrapper.findAll("button").filter(btn => btn.text() === "Increase")
                const DecreaseBtn = wrapper.findAll("button").filter(btn => btn.text() === "Decrease")
                expect(state.count).toEqual(0)
                await IncreaseBtn.trigger('click')
                await IncreaseBtn.trigger('click')
                expect(state.count).toEqual(2)
                await DecreaseBtn.trigger('click')
                expect(state.count).toEqual(1)
            });
        })

    })
    it("Count text show check", () => {
        const localVue = createLocalVue()
        localVue.use(Vuex)
        const store = new Vuex.Store({
            state
        })
        const wrapper = shallowMount(Counter, {
            localVue,
            store
        })

        const count = wrapper.find('span')
        expect(count.exists()).toBeTruthy()
        expect(count.text()).not.toBeNull()
    })
})