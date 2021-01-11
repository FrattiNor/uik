#!bin/ bash
# 告诉系统用bash 执行
# 变量与=之间不能有空格

# 变量
filename=package.json  # 文件名
isVersion=false        # 判断读取的是否是版本
beforeVersion=         # 之前的版本号
newVersion=            # 新的版本号
newVersionIsTrue=false # while新版本是否正确
pushGit=false          # 是否要提交git
pushGitIsTrue=false    # while gitPush变量是否正确

# 查找之前的版本号
function showOldVersion() {
    echo "当前版本号："

    for line in $ $(cat $filename); do
        if [ "$isVersion" == true ]; then
            beforeVersion=$(echo $line | sed "s/[\",]//g")
            echo $beforeVersion
        fi

        if [ $line = "\"version\":" ]; then
            isVersion=true
        else
            isVersion=false
        fi
    done
}

# 输入新版本号
function inputNewVersion() {
    while [ "$newVersionIsTrue" == false ]; do
        echo "输入发布版本号："
        read newVersion

        if [ $(echo $newVersion | sed -r "s/^([1-9][0-9]|[0-9])(\.([1-9][0-9]|[0-9])){2}(-beta[1-9][0-9]*)?$/true/") == "true" ]; then
            newVersionIsTrue=true
            sed -i "" "s/$beforeVersion/$newVersion/" $filename
        else
            echo "版本号输入错误❌"
        fi
    done

}

# 更新changelog
function updateLog() {
    yarn log:all
}

# git提交
function gitAddCommitPush() {
    while [ "$pushGitIsTrue" == false ]; do
        echo "git是否提交（y/n）："
        read pushGit

        if [ $(echo $pushGit | sed -r "s/^[yn]$/true/") == "true" ]; then
            pushGitIsTrue=true
            if [ $pushGit == 'y' ]; then
                git add .
                git commit -am "[update] 新版本 $newVersion"
                git push
            fi
        else
            echo "请输入小写的 y 或者 n"
        fi
    done
}

# yarn 和 npm 设置源为npm
function setNpm() {
    nrm use npm
    yrm use npm
}

# npm发布
function publish() {
    npm publish
}

function putStartAndEnd () {
    echo "=> 开始任务：$1"
    echo "✨ 结束任务：$1"
}

function main () {
    showOldVersion
    inputNewVersion
    updateLog
    gitAddCommitPush
    publish
    putStartAndEnd
}

main