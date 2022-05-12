const REGEX_ANDROID_VERSIONCODE = {
  regex: /versionCode (\d+)/,
  preffix: "versionCode ",
};
const REGEX_ANDROID_VERSIONNAME = {
  regex: /versionName ('.*'|".*")/,
  preffix: "versionName ",
};

const REGEX_IOS_APPBUILD = {
  regex: /APP_BUILD = (\d+)/g,
  preffix: "APP_BUILD = ",
};
const REGEX_IOS_APPVERSION = {
  regex: /APP_VERSION = \d.\d.\d/g,
  preffix: "APP_VERSION = ",
};

const PATH_ANDROID = "android/app/build.gradle";
const PATH_ANDROID_TEST = `test/${PATH_ANDROID}`;

const PATH_IOS = "ios/<projectname>.xcodeproj/project.pbxproj";
const PATH_IOS_TEST = `test/${PATH_IOS}`;

export {
  REGEX_ANDROID_VERSIONCODE,
  REGEX_ANDROID_VERSIONNAME,
  REGEX_IOS_APPBUILD,
  REGEX_IOS_APPVERSION,
  PATH_ANDROID,
  PATH_ANDROID_TEST,
  PATH_IOS,
  PATH_IOS_TEST,
};
