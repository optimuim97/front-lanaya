import { useRouter } from "vue-router";

export const useNavigation = () => {
  const router = useRouter();
  const goToRoute = (
    routeName
    /*, domain*/
  ) => {
    // router.push(`/${domain}/${routeName}`);
    router.push(`/${routeName}`);
  };

  return {
    goToRoute,
  };
};
