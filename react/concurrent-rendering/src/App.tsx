import { lazy, Suspense } from "react";
import SearchInput from "./DeferredSearchInput";
import ProfileLoading from "./ProfileLoading";
import DeferredSearchInput from "./DeferredSearchInput";

/**
 * Use lazy() and Suspense to stop loading the component until it is ready.
 * This allows react to process loading of other components in parallel
 * which promotes concurrent rendering.
 */
const Profile = lazy(() => import("./Profile"));

function App() {
  return (
    <main>
      <h1>Welcome to a demo of concurrent rendering in react</h1>

      <Suspense fallback={<ProfileLoading />}>
        <Profile />
      </Suspense>

      <SearchInput />

      <DeferredSearchInput />
    </main>
  );
}

export default App;
