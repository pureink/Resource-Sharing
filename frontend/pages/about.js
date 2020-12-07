import Layout from '../components/layout'
import {Collapse} from '@geist-ui/react'
export default function About(){
    return(
        <Layout>

            <Collapse.Group>
  <Collapse title="关于本项目">
  <p>  本资源管理共享系统旨在提供一个用于分享空余资源的平台</p>
            <p>本系统由张赫（3018216246），马骁（3018216235），邢思洋（3018216242），郑启俊（3018216250）完成</p>
            <br/>
            <p>用户可以创建修改和删除商品，也可以通过创建订单的形式，购买除自己发布的所有商品。</p>
            <br/>
            <p>订单创建后，发布者可以选择是否接受订单，同意的话即修改商品状态为不可购买，并不显示在商品列表中。</p>
            <p>在经过发布者发货，客户收货即可完成订单。</p>
  </Collapse>
</Collapse.Group>
        </Layout>
    )
}