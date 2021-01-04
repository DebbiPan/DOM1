window.dom = {
    //增
    create(string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },//用于创建节点
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },//用于新增弟弟
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },//用于新增哥哥
    append(parent, node) {
        parent.appendChild(node)
    },//用于新增儿子
    warp(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },//用于新增爸爸

    //删
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },//删除节点

    empty(node) {
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },//删除后代

    //改
    attr(node, name, value) {//重载，根据参数的不同个数，写不同的代码
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配，适用于适用浏览器
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string//ie
            } else {
                node.textContent = string//firefox,chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },//用于读写文本
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTMl = string
        } else if (arguments.length.length === 1) {
            return node.innerHTML
        }
    },//读写HTMl内容
    style(node, name, value) {
        if (arguments.length === 3) {
            //dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                const object = name
                for (let key in object) {
                    //key可能为border、color  node.style.style.border/color
                    //可能是对象或者字符串，是对象就设置它的值，是字符串就获取它的值
                    node.style[key] = object[key]
                }
            }
        }
    },//修改style
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },//添加，删除，获取class
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },//添加监听事件

    //查
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },//获得标签（们）
    parent(node) {
        return node.parentNode
    },//用于获取父元素
    children(node) {
        return node.children
    },//用于获取子元素
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },//获取兄弟姐妹元素
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },//获取弟弟
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },//获取哥哥
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },//遍历
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }//获取排行老几
}