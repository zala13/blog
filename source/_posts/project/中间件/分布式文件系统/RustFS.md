---
title: RustFS 介绍
top: false  # 或 pin: true
toc: true
date: 2026-01-10 22:52:00
tags: [中间件]
categories: [工程/中间件]
---

# 引言

MinIO 官方正式宣布项目进入维护模式，转向维护企业付费的 MinIO AIStor（起价约$96,000/年，针对 400TB）

替代产品: RustFS、Garage

# RustFS 介绍

官网：[RustFS](https://github.com/rustfs/rustfs)
GitHub：[rustfs](https://github.com/rustfs/rustfs)

由国人团队主导的开源项目，目前 GitHub Star 数已狂飙至18k+，根据 GitHub 的数据，RustFS 是增长最快的分布式对象存储。

## 特点

RustFS 是一个基于 Rust 语言开发的高性能分布式对象存储软件，定位与 MinIO 高度相似，功能基本对齐 MinIO 开源版（包括分片上传、桶策略、版本控制、事件通知、生命周期管理等），完全兼容 AWS S3 协议，部署简单（Docker 一键启动），并提供现代化的可视化管理控制台。

## 与其他存储产品的对比

同等硬件条件下，压测性能约为 MinIO 两倍

- CPU：2 核，Intel Xeon (Sapphire Rapids) Platinum 8475B，2.7/3.2 GHz
- 内存：4GB
- 网络：15Gbps
- 硬盘：40GB x 4，IOPS 3800 / Drive

<img src="/img/project/中间件/分布式文件系统/image.png" alt="RustFS对比" style="max-width: 80%; height: auto;">

选择 RustFS 获得更多的优势：
| 特性 | RustFS | 其他对象存储 |
|------|--------|-------------|
| 控制台体验 | 功能强大的控制台<br>提供全面的管理界面。 | 基础/简陋的控制台<br>通常功能过于简单或缺失关键特性。 |
| 语言与安全 | 基于 Rust 开发<br>天生的内存安全。 | 基于 Go 或 C 开发<br>存在内存 GC 停顿或内存泄漏的潜在风险。 |
| 数据主权 | 无遥测 / 完全合规<br>防止未经授权的数据跨境传输。完全符合 GDPR (欧盟/英国)、CCPA (美国) 和 APPI (日本) 等法规。 | 潜在风险<br>可能存在法律风险和隐蔽的数据遥测（Telemetry）。 |
| 开源协议 | **宽松的 Apache 2.0<br>商业友好，无"毒丸"条款。** | 受限的 AGPL v3<br>存在许可证陷阱和知识产权污染的风险。 |
| 兼容性 | 100% S3 兼容<br>适用于任何云提供商和客户端，随处运行。 | 兼容性不一<br>虽然支持 S3，但可能缺乏对本地云厂商或特定 API 的支持。 |
| 边缘与 IoT | 强大的边缘支持<br>非常适合安全、创新的边缘设备。 | 边缘支持较弱<br>对于边缘网关来说通常过于沉重。 |
| 成本 | 稳定且免费<br>免费社区支持，稳定的商业定价。 | 高昂成本<br>1PiB 的成本可能高达 250,000 美元。 |
| 风险控制 | 企业级风险规避<br>清晰的知识产权，商业使用安全无忧。 | 法律风险<br>知识产权归属模糊及使用限制风险。 |

目前项目 issue 平均处理时间为 1 天

# Garage 介绍

官网：[Garage](https://garagehq.deuxfleurs.fr/)
Forge Deuxfleurs：[Deuxfleurs/garage](https://git.deuxfleurs.fr/Deuxfleurs/garage)

Garage 是一款兼容S3的分布式对象存储服务，专为中小规模的自托管场景设计。项目的核心理念是构建一个能够在不同物理位置的服务器上运行的服务，确保数据的多地点复制和高可用性，即使部分服务器出现故障也能保持正常运作。 Garage 的目标是轻量级、易操作且高度耐受硬件故障。

同样提供了一个独立的 Web 管理界面 —— Garage Web UI。帮助你通过浏览器完成日常运维工作，主要功能包括：健康状态监控、桶（Bucket）管理、对象浏览、访问密钥管理等。

# Ceph 介绍

Ceph 是开源分布式存储领域的元老项目，当前仍是开源分布式存储第一梯队。它提供 **对象存储（RGW，兼容 S3）、块存储（RBD） 和 文件存储（CephFS）** 三合一的统一存储平台，能够在普通硬件之上，构建从 PB 到 EB 级、无单点故障的大规模集群。

支持多租户隔离，满足复杂企业环境的需求，适合有专业存储/运维团队的中大型企业。

Ceph 不太适合单机或小规模存储、对单次请求延迟极其敏感的业务、高频率小文件读写以及对运维简单性要求很高的中小团队。

# SeaweedFS 介绍

官网：[https://awesometop.cn/posts/19369f2e0d334b1cb73821cc7553df21]()
GitHub：[seaweedfs/seaweedfs](https://github.com/seaweedfs/seaweedfs)

在大数据存储场景中，传统文件系统难以满足高并发、海量数据存储需求。SeaweedFS作为开源的分布式文件系统，通过分片存储和元数据集中管理，实现了高吞吐、低延迟的存储能力。是一个用于blob、对象、文件和数据湖的分布式存储系统，可快速存储和服务数十亿个文件。

其核心优势体现在：
- 高吞吐设计：支持每秒百万级文件操作
- 灵活扩展：按需增删Volume Server实现弹性容量
- 多副本保障：跨数据中心冗余确保数据可靠性
    开发者通过本文的配置方法与源码分析，可快速构建符合业务需求的分布式存储系统。在日志存储、图片托管、大数据分析等场景中，SeaweedFS的分片机制与低延迟特性能显著提升存储效率，同时降低运维复杂度。

# 云厂商对象存储

云厂商提供的对象存储服务（Object Storage Service，OSS / COS / S3）是一种海量、安全、低成本且高度可靠的云存储形态，适合存放任意类型的文件。容量与吞吐可以按需弹性扩展，并提供多种存储类型，帮助优化整体存储成本。云厂商包括：阿里云 OSS、腾讯云 COS、七牛云、AWS S3 等。有更高的可靠性、安全性、拓展性、低成本、易接入。

# 总结

个人用户：先稳定运行 MinIO，同步开展 RustFS / Garage 测试方案

企业：云厂商 OSS / COS / S3 依然是总体成本最低、心智负担最小的选择——把精力放在业务而不是存储底座上。

参考文章：
1. [对标MinIO！全新一代分布式文件系统诞生！](https://mp.weixin.qq.com/s?__biz=Mzg2OTA0Njk0OA==&mid=2247551577&idx=1&sn=d0c9d0d84267c2ad6d9cd122023d6470&chksm=cfffa4acab9ea00076831013ef9e0a268d59f27b4f135b4b1cc6c8191d5888225b38f88e1c9c&mpshare=1&scene=24&srcid=0109KJbqAbY3acRFwu5CYcIg&sharer_shareinfo=e1ea3c26b8c07d9c4f93daf56502739b&sharer_shareinfo_first=e1ea3c26b8c07d9c4f93daf56502739b#rd)
2. [rustfs/README_ZH.md](https://github.com/rustfs/rustfs/blob/main/README_ZH.md)
3. [SeaweedFS：分布式文件存储系统部署与优化指南](https://awesometop.cn/posts/19369f2e0d334b1cb73821cc7553df21)
4. [推荐开源项目：Garage](https://blog.csdn.net/gitblog_00025/article/details/139189582)