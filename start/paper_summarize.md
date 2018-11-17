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
机器学习，数据挖掘等大量数据依赖型的技术在高速发展的同事，对于相关数据的质和量都提出了更高的要求。网络爬虫，又称网络蜘蛛或者网络机器人，在这样一个数据消费的时代，扮演着数据搬运者和传递者的角色。在其运行的生命周期中，往往会按照






