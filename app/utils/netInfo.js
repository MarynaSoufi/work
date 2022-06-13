import NetInfo from "@react-native-community/netinfo";

export const checkConnectivity = async () => {
  const networkInfo = await NetInfo.fetch();
  return networkInfo.isInternetReachable;
};