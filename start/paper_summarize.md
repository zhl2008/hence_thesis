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

基于链接结构的爬行策略：
Page rank算法主要用于对搜索引擎搜索到的内容进行结果排序，也可以用于评价链接的重要性。在爬虫选取爬行链接时会优先选取Page rank较大的页面中的链接作为优先爬取的对象。

基于增强学习的爬行策略：
Rennie 和 McCallum将增强学习（reinforcement learning)引入聚焦爬虫，他们试图通过机器学习找到一组策略，使得对于该策略的激励达到最优解。【Using Reinforcement Learning to Spider the Web Efficiently】

基于语境图的爬行策略：
Diligenti提出一种通过建立语境图来描述不同网页之间相关度的算法。用大量的数据训练一个机器学习系统，利用该系统计算不同页面到某一主题页面的距离，以此作为确定访问顺序的参考.






###爬虫检测方法

日志语法分析模式 （Syntactical log analysis）
流量模式分析 （Traffic pattern analysis）
分析学习（Analytical learning techniques）
图灵测试系统（Turing test systems）

**日志语法分析模式 **

1.独立字段解析（individual field parsing）
通过比较HTTP请求中独立字段与数据库中的爬虫常使用关键字和banner信息，来判定请求是否来源于爬虫。常用的字段主要是User-Agent。基于User-Agent和其他类似的头部内容检测方法，是检测爬虫最为简单且常用的方法。部分爬虫不会修改其HTTP头部的User-Agent字段，而直接使用其原始的UA对网页进行爬取。而浏览器的UA与爬虫的UA有着明显的区别，甚至可以通过User-Agent字段中的特殊关键词判断访问的浏览器的类型。但是，一部分未知爬虫的UA特征可能并未收集在数据库中还有一些爬虫会修饰其的User-Agent字段，使得通过UA进行单一爬虫检测的漏检率很高。【Prince MB, Holloway L, Keller AM (2005) Understanding how spammers steam your e-mail address: An
analysis of the first six months of data from project honey pot. In: Second conference on Email and
Anti-Spam】

2.多层次日志分析（multifaceted log analysis）
首先，请求robots.txt的访问者被标记为爬虫，这样的流量大概占总web应用访问流量的0.5%。然后，再对日志中的访问IP地址做反向DNS查询，如果dns解析得到的域名中包含诸如robot, bot, search, spider以及crawl这样的关键字，则可以将访问者标记为爬虫，使用该方法大概能检测到16.1%的流量来源于爬虫。最后，通过从网络搜集的爬虫池的IP地址段，来标记来源于爬虫IP的访问。



【Huntington P, Nicholas D, Jamali HR (2008) Web robot detection in the scholarly information environment.
J Info Sci 34:726–741】



**流量模式分析**

语法与模式分析（syntactic and pattern analysis）
Geens et al. 最早提出了将语法分析与流量分析模式结合在一起的检测方法，并给定了两个评估参数:
r 覆盖率 r = 检测出爬虫数量/实际爬虫数量
p 准确率 p = 检测出爬虫数量/被检测器标记为爬虫的数量
通过人工标记数据的方法，分别计算每种分析模式的r和p，并最终得出了以下的检测策略（以伪代码描述）：

if ("/robots.txt" in session.url):
    session.role = robots
if (session.ip in robots.ip):
    session.role = robots
if (session.ua in robots.ip):
    session.role = robots
if (HEAD in session.methods):
    session.role = robots
if (session.refer == NULL && ! "*.[png|jpg|gif]" in session.url):
    session.role = robots
    

【Geens N, Juysmans J, Vanthienen J (2006) Evaluation of Web robot discovery techniques: a benchmarking study. In: Lecture notes in computer science vol 4065/2006, pp 121–130】


资源请求模式分析（resource request patterns）

爬虫在爬取网站时，往往会聚焦于一些特殊的网络资源。guo等人利用这一特性，提出了一种基于资源请求模式分析的爬虫检测方法。首先在第一种策略中，他们将请求的url资源分为网页，文档，脚本，图片，视频，下载等多种类型。然后他们将依据IP，UA这些信息，区分不同的请求客户端，并统计每一个客户端针对每种资源的访问次数。如果访问次数过多或者访问占比过多，则可以认为请求来自于爬虫；在第二种策略中，他们统计了同一个session对同一个网页的所有资源的请求次数，如果同一个网页中的资源请求数有较大的差异，则可以认为当前的session来自于爬虫。

请求速率模式分析 （query rate patterns）
为了从速率模式区分正常访问与爬虫访问，需要采集如下的信息：
请求提交速率，请求平均时间间隔，session的活动持续时间，请求时间与作息时间的相关性。
在Duskin的文章中，他们提出了两种不同的爬虫检测方法：
首先，基于每个session的请求总次数来划分人类和爬虫；
然后，基于每个session的最短请求间隔时间来区分人类和爬虫。


流量指标分析：
可能跳过。（复杂与过于主观）


滑动时间窗口检测：(可以加进去）


**分析学习**

决策树（decision tree）
Tan and Kumar 利用爬虫的session中的一些特征向量来区分人类用户与爬虫。首先，他们从日志数据中，将所有的请求按照session进行分类。然后他们从每个session中抽取出25个特征向量，并使用其中显著的三个特征为原始数据集打上标签。并在随后的处理中，考虑全部25个特征向量，以之前已经标记好的数据为学习数据使用 C4.5 决策树算法构造决策树。最后的分类效果显示该算法具有较好的覆盖率和准确率。
【Tan PN, Kumar V (2002) Discovery of Web robot sessions based on their navigational patterns. Data Min Knowl Discov 6(1):9–35】



隐马尔科夫模型（Hidden Markov model）
Lu and Yu 在2006年提出一个基于请求到达模式的用户与爬虫识别程序。他们把人类访问的特征概括为访问所有内嵌页面资源的突发性访问HTTP请求，在整个session过程中，会因为阅读和处理页面内容而存在不活跃时间。而爬虫则会以一个稳定均匀的速率爬行特定类型的资源。在他们提出的算法中，他们先将流量按等时间段切片，在每个时间片中会有一到多个请求到达。通过UA来判定是否为爬虫，并以此来标记数据训练HMM。在最后，以未来的请求序列作为已训练的HMM模型的输入，使用forward-backward procedure来计算其可能是爬虫请求的概率。


图灵测试系统（turing test system)
Completely Automated Public Turing test to tell Computers and Humans Apart（CAPTCHA）最早在2003年由Ahn等人提出。CAPTCHA通常都是以验证码形式存在，设计的目标是让真实使用者更容易通过测试而爬虫更难通过测试。


隐性的人类浏览行为(implicit human browsing behavior)
通过一些隐性的人类浏览网页时特有的行为来帮助区分真实用户和爬虫。比如在服务端生成一个秘钥k，并编码在混淆后的javascript中，当javascript被执行后，或者监听到某些人类用户特有的行为后（如点击事件或者键盘键入），使用该k向服务端请求响应的url地址，则该请求来源可以被标记为人类用户。针对真实用户与爬虫访问的资源类型不同，可以使用特殊标记的CSS样式表文件或者透明像素的图片文件来识别爬虫。正常加载这些标记文件有很大的可能性是正常用户，而未加载这些资源的用户，则很可能是爬虫。




##爬虫溯源技术

**浏览器指纹：**
不同用户的浏览器具有不同的特征信息和丰富的数据，网站可以通过在用户访问时通过不同的 API 和技术手段获取浏览器特征信息构建独特的浏览器指纹。浏览器指纹技术能够在无cookie的情况下提供一种追踪用户的鲁棒性方案。
常用的浏览器指纹包括：

浏览器指纹算法：
令指纹生成算法为 F(⋅)。当出现一个新的浏览器信息
x 时，生成一个浏览器指纹 F(x)。该算法遵循离散概率密
度函数 P( f n) 。其中，fn 为某个特征信息的指纹生成结果 ；
n∈[0,1,…,N]，N 为特征信息的个数。对于某单个特征信息
的指纹生成结果 fn，使用自信息量 I 表示该浏览器指纹所
包含信息的比特数，即：

公式一


当指纹由多个不同的特征信息组合而成时，假设不同
特征信息对应的指纹生成算法为 Fs()，s∈[0,1,…,S ]（S 为指
纹生成算法的个数），则根据公式（2）单独计算每个特征
信息的指纹生成结果 fn,s 的自信息量 Is(fn,s)，并根据公式（3）
定义指纹组件的信息熵 Hs(Fs)。

公式二
公式三

信息熵表征浏览器所有自信息量的期望值。对于两个
相互独立的特征组件，自信息量可直接线性相加。
根据自信息量 I 可以确认指纹归属对象的身份。I 包含
的若干比特信息中的每一比特信息都能将该浏览器指纹可
能的归属集合减半。特征信息进行组合生成指纹，每一个
特征信息具有若干比特的信息熵，熵值越大，则越能准确
地区分不同的浏览器实体。因此要选取恰当且包含足够比
特信息的特征信息集合，通过该特征信息集合生成的指纹
能够唯一确认指纹归属对象的身份。本文选取的特征信息
集合为浏览器类型及其版本、屏幕分辨率、设备像素比、
Firefox 特殊信息和字体列表。

浏览器特定指纹：
ECKERSLEY根据浏览器的环境，通过收集一些网站能够获取的浏览器常用或者不常用的特性，用以生成浏览器的指纹。这些特性中有一部分可以通过简单静态的HTTP请求中推断出来，也可以经由AJAX接口收集。特性收集过程中，有一部分特性是简单明了的，但有一部分特性是来源于一些浏览器细节。有些浏览器禁用了javascript，那么他会使用video，plugins，fonts和supercookie的默认值。因此可以通过这一细节来推断出浏览器是否禁用了javascript。以下是一些常用的，易于采集的浏览器特性：
![屏幕快照 2018-11-21 下午12.29.56](https://lh3.googleusercontent.com/-yUzBmjaRXPk/W_Tf1kB3zLI/AAAAAAAAAHU/raDJHdPPDigjFvOQp_9pTGgi6hv4eYiSACHMYCw/I/%255BUNSET%255D)



Canvas 指纹
JavaScript 引擎指纹
跨浏览器指纹


**指纹技术评估:**



**浏览器指纹干扰**


**headless web driver**






指纹技术：
指纹技术可以有效地对抗爬虫池代理

cookie追踪：


https://panopticlick.eff.org/results?aat=1&a=111&t=111&dnt=111#fingerprintTable

CANVAS指纹
Web RTC指纹
防盗链技术

headless webdriver

基于滑动时间窗口的反爬虫机制




IP访问频率检测：
人类访问网页的速度和爬虫访问网页速度有明显的区别。爬虫在设计上往往是多线程和高并发。通过设置相应的cookie可以用于统计在某个时间段，某个session的访问频率，对于访问频率高的session，使用CAPTCHA来进行人机验证。对于没有通过人机验证，且session访问频率超过阈值的访问会话，一律阻断其连接。






session检测
离线日志分析（offline robots detection)



PathMarker




###headless webdriver




改变网页结构
重要的数据图片化







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







