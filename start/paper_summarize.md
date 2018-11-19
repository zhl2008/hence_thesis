#文献综述（无格式版）
by Hence Zhang@Lancet

###基本信息：
论文题目：爬虫陷阱：一种反爬虫系统的设计、实现以及评估


文献综述结构：

背景及概述：
研究背景（大数据与AI时代，数据流通，数据造假，三月份流量高峰）

研究的意义（恶意爬虫的危害，降低虚假流量，减轻服务器压力与性能/带宽开销，保证运营者统计数据的纯净度，防止有价值的信息被窃取，利用漏洞攻击爬虫所在的主机，增加爬虫扫描的成本）

研究内容概述（首先是系统设计：包括爬虫检测技术，爬虫行为分析技术，爬虫溯源技术，爬虫漏洞挖掘与攻击载荷生成；其次是系统实现，包括各个模块之间的交互与耦合，以及不同环境下的挂载和部署方案；最后是系统评估，使用一些主流的爬虫或者网上搜集的爬虫，来评估整个系统的检测率和误检率，最后对挂载前后的web做简单的性能测试，评估爬虫系统挂载后的性能变化）

爬虫技术：（找一些更加先进的理论）
爬虫策略
基于遗传算法的主题爬虫策略
基于内容和链接分析的主题爬虫策略

selenium phantomjs
headless web-driver


爬虫检测技术：

js obfuscate
taint page



爬虫行为分析与溯源：

taint link
时间序列分析：
canvas指纹：
Web RTC

爬虫漏洞挖掘：
动态符号执行与fuzz
污点分析







##爬虫陷阱：一种反爬虫系统的设计、实现以及评估

摘要：在以数据为中心的信息时代，如何快速廉价地获取大量有效的数据，是维持高度数据依赖的组织的竞争力的关键。而在真实互联网环境，数据往往是不均匀地散落在以web为代表的互联网的各个角落中。为了更快更廉价的获取数据，很多互联网组织和个人开发了各式各样的网络爬虫（crawler）来抓取他们感兴趣的数据。爬虫在互联网数据传播过程中起到了至关重要的作用


但是，网络中同样充斥着大量恶意的爬虫，他们要么多线程高并发地请求服务器，要么抓取一些敏感的或者高价值的数据，转手将数据倒卖给商业竞争对手。因此，针对爬虫反制措施的重要性也凸显了出来。但是，遗憾的是，传统的反爬虫方式过于保守和被动，在漏检率和误检率居高不下的情况下，只能通过单一的反制手段来限制爬虫（如IP封锁，访问频率限制，虚假数据等），在发爬虫的战争中收效甚微。为此，本文提出了一种新型的反爬虫的系统，融合爬虫检测技术，爬虫行为分析和溯源技术，并通过动态符号执行、模糊测试以及污点分析等方法，挖掘爬虫使用的框架、处理脚本，headless webdriver驱动程序的漏洞，并通过返回构造恶意的payload，对运行爬虫的主机进行反向渗透，最终诱使爬虫进程奔溃，甚至获取爬虫主机权限。此外，本文将遵循上述的设计思路，实现该反爬虫系统crawler trap的原型系统，并将其部署真实的业务系统上，使用网络上常见的爬虫进行测试，从漏检率、误检率、系统性能增益等多方面的指标来评估整crawler trap系统。


关键词：网络爬虫，反爬虫机制，headless webdriver，爬虫检测，爬虫溯源，动态符号执行，反向渗透



精简版摘要：
随着各类基于大数据和AI的应用的兴起，快速廉价地获取大量有效数据的能力，成为互联网时代企业和个人竞争力的体现。网络爬虫在数据收集收集方面的重要性逐渐凸显出来。但是，网络中充斥着大量恶意的爬虫，或者多线程高并发耗尽服务器的资源，或者爬取敏感、高价值的数据用于不法用途。

因此，构建一个成熟有效的反爬虫系统，成为一个亟待解决的问题。但遗憾的是，传统的反爬虫方式过于保守和被动，在漏检率和误检率居高不下的情况下，只能通过单一的反制手段来限制爬虫（如IP封锁，访问频率限制，虚假数据等），在反爬虫的战争中收效甚微。为此，本文提出了一种新型的反爬虫的系统，融合爬虫检测技术，爬虫行为分析和溯源技术，并通过动态符号执行、模糊测试以及污点分析等方法，挖掘爬虫使用的框架、处理脚本，headless webdriver驱动程序的漏洞，并通过返回构造恶意的payload，对运行爬虫的主机进行反向渗透，最终诱使爬虫进程奔溃，甚至获取爬虫主机权限。此外，本文将遵循上述的设计思路，实现该反爬虫系统crawler trap的原型系统，并将其部署真实的业务系统上，使用网络上常见的爬虫进行测试，从漏检率、误检率、系统性能增益等多方面的指标来评估crawler trap系统。


Crawler Trap：Design, implement and evaluate an anti-crawling system

With the flourishment of the Applications based on the Big Data and Artificial Intelligence, it has arouse our attention in how to collect numerous valid data rapidly at the least cost, which could be regarded as an aspect of competence both for the individuals and the companies. And thus, the power of the crawlers in collecting data has been addressed. However, there are plenty of malicious crawlers filling in the cyber space, try to deplete the servers' resource with endless requests concurrently, or theft the sensitive data for illegal use.

Therefore, we are supposed to build up a feasible and robust anti-crawling system to stop those malicious crawlers, while most of the contemporary anti-crawling systems are using the passive strategies. Those anti-crawling systems could only harness single mechanism to block the crawlers( such as IP blocks, limit the frequency of requests, fake data), and that does not seems to be effective in most cases. In this paper, I propose an anti-crawling system, which combines the crawler detection with the analysis of crawler's behaviors, then utilize the dynamic symbolic execution, fuzzing and dynamic taint analysis， to excavate the vulnerabilities of the frameworks, the handle scripts and the headless web-driver binaries of the crawlers. Ultimately, malicious payloads would be generated to feed the crawler when it crawls our pages, leading it to crash down or even obtain the system privileges of the crawler's host. In addition, at the end of paper, I would build up the prototype of the anti-crawling system according to the technologies and mechanisms mentioned before, with the deployment to the web application in real production environment. Furthermore, several tests would be conducted with the most common crawlers gathered from the Internet to testify its ability to block the crawlers and the performance.



###背景及概述
研究背景：

**网络爬虫定义：**
机器学习，数据挖掘等大量数据依赖型的技术在高速发展的同事，对于相关数据的质和量都提出了更高的要求。网络爬虫，又称网络蜘蛛或者网络机器人，在这样一个数据消费的时代，扮演着数据搬运者和传递者的角色。在其运行的生命周期中，往往会按照开发者预设的规则，爬取指定的URL地址或者URL地址列表，并将获取到的数据预处理成标准化的格式。


**恶意爬虫及其影响**
普通的网络爬虫并没有危害，相反，搜索引擎存储数据的来源都是基于大量分布式网络爬虫爬取得到的结果，网络爬虫在数据传递过程中起到至关重要的重要。但是多线程高并发的失控爬虫，针对隐私数据的窃密爬虫，以及不遵守爬虫道德规范的恶意爬虫，都对网络空间健康的生态环境提出了巨大的挑战。

爬虫失控往往是具有多线程操作的通用型爬虫，未能控制爬行时间间隔，或者因为未添加地址环回检测的处理逻辑，在处理的特殊的地址链接时陷入死循环中。失控的爬虫通常给网站的性能资源和带宽资源带来巨大的消耗，甚至会影响正常人类用户的体验，这样的爬虫对网站的影响相当于是DDOS攻击【基于SOA架构的】每年的三月份，是失控爬虫的高发期，原因正是大量的硕士在写论文时会大量爬取数据用于数据挖掘或者机器学习。

此外，部分互联网公司会爬取其他同行的优质数据用于商业用途，在给其竞争对手带来经济效益的损失的同时，还会促进行业内部恶性竞争的循环。例如，马蜂窝网站的用户评论数据造假事件。




**现有的反爬虫技术及其缺陷：**
为了防范恶意爬虫和失控爬虫，保护网站相关重要数据以及网站的可用性，市场上已经出现较为成熟的反爬虫机制。但是，主流的反爬虫策略仍然停留在静态、单一、被动与非实时的状态，很容易被精心设计的爬虫欺骗。主流反爬虫系统主要分为检测系统和处理系统两部分，检测系统往往通过User-agent检测，访问频率检测以及验证码方案来区分正常用户与爬虫访问的流量。处理系统则采用单一手段，通常过滤爬虫的IP地址，或者对爬虫的访问频率进行限制。这样的反爬虫策略在日新月异的反反爬虫技术面前，往往效果不尽人意。
反反爬虫常用的躲避检测的手段有：
1.降低访问频率，使访问频率接近于真实人类用户；
2.修改HTTP头部特征（包括但不限于UA）；
3.使用IP代理池（能够有效抵御反爬虫IP封锁的策略）；
4.使用自动化测试工具（如Selenium）


**研究的意义**
恶意的爬虫往往会给服务器的资源带来巨大的损耗，在盗用数据的同时，也会给针对访问的统计数据带来污染。甚至有少量的爬虫，在爬取某些CMS系统或者web中间件的后，会使用相应的攻击向量攻击脆弱主机，给网站服务提供者及用户造成巨大的损失。
网络空间一直爬虫与反爬虫斗争的前线，随着反反爬虫技术的不断迭代更新，传统的静态、单一、被动与非实时的反爬虫技术难以与之对抗，或者又因为部署成本和部署带来的性能损失而束之高阁。
本文提出的新型的反爬虫系统，将有效地缓解上述问题，能够增加爬虫扫描的资源成本，增加反反爬虫迭代更新的人力成本甚至在一定条件下，造成爬虫的crash，和获取爬虫宿主机的系统权限。


**研究内容概述**
本文将提出一种新型反爬虫系统，并从该系统的设计、实现以及评估三个方面具体展开，对相关技术及原理进行深入的介绍。系统所使用的技术主要有：爬虫检测技术，爬虫行为分析技术，爬虫溯源技术，以及爬虫漏洞挖掘与攻击载荷的自动化生成。

爬虫检测技术章节将重点介绍较为常见的爬虫检测技术以及新型爬虫检测技术，并简述这些技术的使用范围及缺陷和优点。

爬虫行为分析技术将具体描述几种常见的爬虫，以及这些爬虫采用的策略以及访问时产生的明显特征。

爬虫溯源技术将介绍如何通过浏览器指纹、服务端session、IP地址以及javascript来收集爬虫宿主机的一些信息。

爬虫漏洞挖掘技术将介绍如何自动化地挖掘爬虫使用的框架，处理脚本以及headless webdriver的漏洞。





（首先是系统设计：包括爬虫检测技术，爬虫行为分析技术，爬虫溯源技术，爬虫漏洞挖掘与攻击载荷生成；其次是系统实现，包括各个模块之间的交互与耦合，以及不同环境下的挂载和部署方案；最后是系统评估，使用一些主流的爬虫或者网上搜集的爬虫，来评估整个系统的检测率和误检率，最后对挂载前后的web做简单的性能测试，评估爬虫系统挂载后的性能变化）



##爬虫检测技术


###爬虫分类
网络爬虫大致可分为四种。通用网络爬虫，聚焦网络爬虫，增量式网络爬虫，深层网络爬虫。【网络爬虫技术的研究】
通用爬虫：
通用网络爬虫又称全网爬虫(Scalable Web Crawler)，爬行对象主要是门户站点搜索引擎和大型Web服务提供商采集数据。通常会从一个种子URL地址开始，递归地搜索遍历该种子地址下的所有URL地址。

聚焦式网络爬虫：
聚焦网络爬虫(Focused Crawler)，又称主题网络爬虫(Topical Crawler)，是指选择性地爬行那些与预先定义好的主题相关页面的网络爬虫。通常只需要爬取与其感兴趣的主题相关的页面，保存的页面内容数量少，更新快。


增量网络爬虫：
增量式网络爬虫(Incremental Web Crawler)将参照已下载的网页内容，采用增量更新的方式只爬取没有下载或者已经发生变换的页面。以较高的访问频次来保证爬取的内容的实时性，但是因其只请求和持久化增量的静态内容，所以请求的数据量较少。


深层网络爬虫：
web页面按其存在方式一般分为表层网和深层网。表层网通常可以由搜索引擎检索，以超链接的形式能够到达，Deep Web指的是不能直接检索，隐藏在表单之后的网页。

深层网络爬虫（Deep Web Crawler)主要用于爬取普通爬虫无法爬取到的深层网络，通常是提交某些参数（如登录操作）后才能到达的页面。

###爬虫调度策略与爬行策略：
爬虫的目的是在短时间内尽可能获得最多的高质量数据。当前有五种评估页面质量的机制：
【1】similarity 
【2】Backlink 
【3】Pagerank 
【4】forwardlink 
【5】location
而为了爬虫的爬取速度，爬虫往往以并行地方式运行，单也引入了如下的问题：
重复性：线程增加的同时可能增加页面重复的几率
通信带宽损耗：分布式爬虫之间的同步通信损耗大量的带宽和计算资源
并行运行时，爬虫通常采取如下三种方式：
独立运行: 所有爬虫独立运行，互不影响，全部爬取完成后，再统一处理爬行资源。
动态队列分配：使用统一的任务队列分配爬虫的爬取任务，每一次爬虫从任务队列中获取到爬取任务，都是动态且随机的。
静态分配：在爬虫任务开始前，事先为所有的爬虫分派爬取的内容，而在爬虫爬取过程中不再做额外的修改。

对于通用爬虫而言，常用的策略主要有深度优先爬行策略和广度优先优先策略两种。

深度优先：
将链接深度从低到高排列，依次访问下一级网页链接直到不能深入为止。在完成一个分支网页的爬行任务后，返回上一个链接节点，进一步搜索其他链接。

广度优先：
按目录层次深浅来规划爬行的轨迹，从浅层的web目录开始爬行，低层次的目录爬行完毕后，再深入下一层继续爬行。可以有效的控制爬行的深度，避免无穷深层次分支的情况下无法走出陷进。

聚焦爬虫策略的关键是对访问页面和链接的重要性进行评分，并以此作为页面爬取先后的顺序的参考依据，而不同算法计算出的页面重要性也有所不同，从而导致爬虫爬行轨迹的不同。

基于内容的爬行策略：
Paul在他的论文中提出了Fish-Search算法【Information Retrieval in Distributed Hypertexts】，以页面内容与爬虫的聚焦主题的相关性作为度量标准。鱼群按照深度优先的策略在爬行空间中巡游，相关度高的分支，鱼群的数量会增加；而相关度低的分支，鱼群的数量会降低。通过这样的机制来保证主要的爬虫资源和时间能够聚焦在感兴趣的主题上。    







基于滑动时间窗口的反爬虫机制



检测和控制：
UA机制
访问频率限制
验证码方案
访问的数据的内容和访问频率
滑动时间窗口检测


处理方案：
单一的阻断



broswer check
https://www.smwenku.com/a/5bafe50e2b7177781a0f6de4/zh-cn/






研究的意义（恶意爬虫的危害，降低虚假流量，减轻服务器压力与性能/带宽开销，保证运营者统计数据的纯净度，防止有价值的信息被窃取，利用漏洞攻击爬虫所在的主机，增加爬虫扫描的成本）

研究内容概述（首先是系统设计：包括爬虫检测技术，爬虫行为分析技术，爬虫溯源技术，爬虫漏洞挖掘与攻击载荷生成；其次是系统实现，包括各个模块之间的交互与耦合，以及不同环境下的挂载和部署方案；最后是系统评估，使用一些主流的爬虫或者网上搜集的爬虫，来评估整个系统的检测率和误检率，最后对挂载前后的web做简单的性能测试，评估爬虫系统挂载后的性能变化）







