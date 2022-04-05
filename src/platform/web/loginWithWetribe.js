/ import {RecordRequester, ReplayRequester} from "./matrix/net/request/replay";
import {RootViewModel} from "../../domain/RootViewModel.js";
import {createNavigation, createRouter} from "../../domain/navigation/index.js";
// Don't use a default export here, as we use multiple entries during legacy build,
// which does not support default exports,
// see https://github.com/rollup/plugins/tree/master/packages/multi-entry
export async function main(platform) {
    try {
        // to replay:
        // const fetchLog = await (await fetch("/fetchlogs/constrainterror.json")).json();
        // const replay = new ReplayRequester(fetchLog, {delay: false});
        // const request = replay.request;

        // to record:
        // const recorder = new RecordRequester(createFetchRequest(clock.createTimeout));
        // const request = recorder.request;
        // window.getBrawlFetchLog = () => recorder.log();
        const navigation = createNavigation();
        platform.setNavigation(navigation);
        const urlRouter = createRouter({navigation, history: platform.history});
        urlRouter.attach();
        const vm = new RootViewModel({
            platform,
            // the only public interface of the router is to create urls,
            // so we call it that in the view models
            urlCreator: urlRouter,
            navigation,
        });
        await vm.load();
        platform.createAndMountRootView(vm);
    } catch(err) {
        console.error(`${err.message}:\n${err.stack}`);
    }
}
