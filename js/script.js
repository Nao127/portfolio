'use strict';

{/* ローカルスコープ */

    // DOM取得
    const worksTypes = document.querySelectorAll('.type_button-item');
    console.log(worksTypes);

    // イベント付加
    worksTypes.forEach(
        (workType) => {
            workType.addEventListener('click', tabSwitch);
        }
    )

    // イベントの処理
    function tabSwitch(e) {

        // クリックされた要素のデータ属性を取得
        const typeTargetData = e.currentTarget.dataset.type;

        // クリックされた要素の親要素と、その子要素を取得
        const typeList = e.currentTarget.closest('.works-type');
        console.log(typeList);
        const typeItems = typeList.querySelectorAll('.type_button-item');
        console.log(typeItems);

        // クリックされた要素の親要素の兄弟要素の子要素を取得
        const worksCards = typeList.
        nextElementSibling.querySelectorAll('.works-card');
        console.log(worksCards);

        // クリックされたbuttonの同階層のmenuとpanelのクラスを削除
        typeItems.forEach(
            (typeItem) => {
                typeItem.classList.remove('is-active');
            }
        )
        worksCards.forEach(
            (worksCard) => {
                worksCard.classList.remove('is-show');
            }
        )

        //クリックされたボタンにis-activeクラスを付加
        e.currentTarget.classList.add('is-active');

        //クリックされたボタンのデータ属性と同じ値を持つカードにis-showクラスを付加
        worksCards.forEach(
            (worksCard) => {
                if (worksCard.dataset.card === typeTargetData) {
                    worksCard.classList.add('is-show');
                }
            }
        )

    }
}
