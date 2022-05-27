"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_IOS_APPVERSION = exports.REGEX_IOS_APPBUILD = exports.REGEX_ANDROID_VERSIONNAME = exports.REGEX_ANDROID_VERSIONCODE = exports.PATH_IOS_TEST = exports.PATH_IOS = exports.PATH_ANDROID_TEST = exports.PATH_ANDROID = void 0;
const REGEX_ANDROID_VERSIONCODE = {
  regex: /versionCode (\d+)/,
  preffix: "versionCode "
};
exports.REGEX_ANDROID_VERSIONCODE = REGEX_ANDROID_VERSIONCODE;
const REGEX_ANDROID_VERSIONNAME = {
  regex: /versionName ('.*'|".*")/,
  preffix: "versionName "
};
exports.REGEX_ANDROID_VERSIONNAME = REGEX_ANDROID_VERSIONNAME;
const REGEX_IOS_APPBUILD = {
  regex: /APP_BUILD = (\d+)/g,
  preffix: "APP_BUILD = "
};
exports.REGEX_IOS_APPBUILD = REGEX_IOS_APPBUILD;
const REGEX_IOS_APPVERSION = {
  regex: /APP_VERSION = \d+.\d+.\d+/g,
  preffix: "APP_VERSION = "
};
exports.REGEX_IOS_APPVERSION = REGEX_IOS_APPVERSION;
const PATH_ANDROID = "android/app/build.gradle";
exports.PATH_ANDROID = PATH_ANDROID;
const PATH_ANDROID_TEST = `test/${PATH_ANDROID}`;
exports.PATH_ANDROID_TEST = PATH_ANDROID_TEST;
const PATH_IOS = "ios/<projectname>.xcodeproj/project.pbxproj";
exports.PATH_IOS = PATH_IOS;
const PATH_IOS_TEST = `test/${PATH_IOS}`;
exports.PATH_IOS_TEST = PATH_IOS_TEST;