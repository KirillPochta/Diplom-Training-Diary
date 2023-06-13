import { LinearProgress } from "@mui/material";

export default function bzu({ bgoal, b, zgoal, z, ugoal, u }) {
    let bprogress = Math.min((b / bgoal) * 100, 100);
    let zprogress = Math.min((z / zgoal) * 100, 100);
    let uprogress = Math.min((u / ugoal) * 100, 100);

    return (
        <div style={{ paddingLeft: '15px', paddingRight: '15px' }}>
            <h2>Белки</h2>
            <div className="calories">
                <div className="calories__consumed">
                    <span className="data">
                        {Math.round(b)}
                    </span>
                    <br />
                    <small className="calories-small-font">употреблено</small>
                </div>
                <div className="calories__goal">
                    <span className="data">{bgoal}</span>
                    <br />
                    <small className="calories-small-font">цель на день</small>
                </div>
            </div>
            <LinearProgress
                className="progress-bar"
                variant="determinate"
                color="primary"
                value={Math.round(bprogress)}
                style={{}}
            />

            <h2>Жиры</h2>
            <div className="calories">
                <div className="calories__consumed">
                    <span className="data">
                        {Math.round(z)}
                    </span>
                    <br />
                    <small className="calories-small-font">употреблено</small>
                </div>
                <div className="calories__goal">
                    <span className="data">{zgoal}</span>
                    <br />
                    <small className="calories-small-font">цель на день</small>
                </div>
            </div>
            <LinearProgress
                className="progress-bar"
                variant="determinate"
                color="primary"
                value={Math.round(zprogress)}
                style={{}}
            />

            <h2>Углеводы</h2>
            <div className="calories">
                <div className="calories__consumed">
                    <span className="data">
                        {Math.round(u)}
                    </span>
                    <br />
                    <small className="calories-small-font">употреблено</small>
                </div>
                <div className="calories__goal">
                    <span className="data">{ugoal}</span>
                    <br />
                    <small className="calories-small-font">цель на день</small>
                </div>
            </div>
            <LinearProgress
                className="progress-bar"
                variant="determinate"
                color="primary"
                value={Math.round(uprogress)}
                style={{}}
            />
        </div>
    )
}